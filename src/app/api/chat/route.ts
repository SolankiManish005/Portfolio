import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { experience } from "@/data/experience";
import { faqs } from "@/data/faq";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { getPortfolioContext } from "@/lib/portfolio-context";
import dbConnect from "@/lib/mongodb";
import ChatConversation from "@/models/ChatConversation";

type ChatRequestBody = {
  message?: string;
  sessionId?: string;
  visitorName?: string;
  visitorEmail?: string;
};

const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const GEMINI_COOLDOWN_MS = 10 * 60 * 1000;
const MAX_STORED_MESSAGES = 24;

let geminiDisabledUntil = 0;

function buildPrompt(message: string) {
  return [
    "You are a helpful AI chatbot for Manish Solanki's portfolio website.",
    "Only answer using the portfolio context below.",
    "If the user asks something not in the context, politely say you only know portfolio-related information and suggest contacting Manish.",
    "Keep answers short, friendly, and clear.",
    "",
    getPortfolioContext(),
    "",
    `User question: ${message}`,
  ].join("\n");
}

function buildLocalReply(message: string) {
  const normalized = message.toLowerCase();

  if (isGreetingOnly(normalized)) {
    return "Hi! Ask me about Manish's skills, projects, experience, industries, or contact details.";
  }

  if (!isPortfolioQuestion(normalized)) {
    return "I can only help with Manish's portfolio topics like skills, projects, experience, industries, and contact details.";
  }

  if (
    normalized.includes("skill") ||
    normalized.includes("stack") ||
    normalized.includes("technology") ||
    normalized.includes("tech")
  ) {
    const groups = skillGroups
      .map((group) => `${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`)
      .join("\n");

    return `Main skills and tools:\n${groups}`;
  }

  if (normalized.includes("project")) {
    return projects
      .slice(0, 4)
      .map((project) => `${project.title}: ${project.description}`)
      .join("\n");
  }

  if (
    normalized.includes("experience") ||
    normalized.includes("work") ||
    normalized.includes("intern")
  ) {
    return experience
      .map((item) => `${item.title} at ${item.company} (${item.duration})`)
      .join("\n");
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("whatsapp")
  ) {
    return "You can contact Manish at solankimanish0045@gmail.com. The portfolio contact form also saves messages to MongoDB and can open WhatsApp with a pre-filled message.";
  }

  if (normalized.includes("about") || normalized.includes("who are you")) {
    return "Manish Solanki is a MERN Stack Developer from Gujarat, India, focused on React, Next.js, Node.js, MongoDB, and full-stack web apps.";
  }

  const topFaq = faqs[0];
  return `${topFaq.question} ${topFaq.answer}`;
}

function isGreetingOnly(normalized: string) {
  return /^(hi|hello|hey|hii|hiii|yo|sup|good morning|good afternoon|good evening)[!\s.]*$/.test(
    normalized,
  );
}

function isPortfolioQuestion(normalized: string) {
  return [
    "skill",
    "stack",
    "technology",
    "tech",
    "project",
    "experience",
    "work with",
    "worked with",
    "industry",
    "industries",
    "contact",
    "email",
    "whatsapp",
    "about",
    "resume",
    "education",
    "intern",
    "job",
    "career",
    "what do you do",
    "who are you",
    "tell me about",
  ].some((term) => normalized.includes(term));
}

function isGeminiUnavailable(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes("429") ||
    error.message.includes("fetch failed") ||
    error.message.includes("404 Not Found") ||
    error.message.includes("model is not found") ||
    error.message.includes("unexpected model name format")
  );
}

async function persistConversation(
  sessionId: string,
  userMessage: string,
  assistantMessage: string,
  visitorName?: string,
  visitorEmail?: string,
  visitorIP?: string,
) {
  await dbConnect();

  const conversation = await ChatConversation.findOne({ sessionId });
  const nextMessages = [
    ...(conversation?.messages ?? []),
    { role: "user" as const, content: userMessage },
    { role: "assistant" as const, content: assistantMessage },
  ].slice(-MAX_STORED_MESSAGES);

  await ChatConversation.findOneAndUpdate(
    { sessionId },
    {
      sessionId,
      messages: nextMessages,
      ...(visitorName && { visitorName }),
      ...(visitorEmail && { visitorEmail }),
      ...(visitorIP && { visitorIP }),
    },
    { upsert: true, new: true },
  );
}

function sanitizeConversationId(sessionId?: string) {
  return sessionId?.trim() || "anonymous";
}

async function getAssistantReply(message: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || Date.now() < geminiDisabledUntil) {
    return buildLocalReply(message);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });

  try {
    const result = await model.generateContent(buildPrompt(message));
    const reply = result.response.text().trim();

    return (
      reply || "I could not generate a response right now. Please try asking again."
    );
  } catch (error) {
    if (isGeminiUnavailable(error)) {
      geminiDisabledUntil = Date.now() + GEMINI_COOLDOWN_MS;
      console.warn(
        `Gemini unavailable. Falling back to local responses for ${GEMINI_COOLDOWN_MS / 60000} minutes.`,
      );
      return buildLocalReply(message);
    }

    console.warn(`Gemini model failed: ${PRIMARY_MODEL}`, error);
    return buildLocalReply(message);
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = sanitizeConversationId(
      request.nextUrl.searchParams.get("sessionId") ?? undefined,
    );

    await dbConnect();
    const conversation = await ChatConversation.findOne({ sessionId }).lean();

    return NextResponse.json({
      success: true,
      sessionId,
      messages: conversation?.messages ?? [],
    });
  } catch (error) {
    console.error("Chat history error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to load chat history.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = body.message?.trim();
    const sessionId = sanitizeConversationId(body.sessionId);
    const visitorName = body.visitorName?.trim();
    const visitorEmail = body.visitorEmail?.trim();
    
    // Extract visitor IP
    const visitorIP =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 },
      );
    }

    const assistantReply = await getAssistantReply(message);
    await persistConversation(
      sessionId,
      message,
      assistantReply,
      visitorName,
      visitorEmail,
      visitorIP,
    );

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      sessionId,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to answer right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
