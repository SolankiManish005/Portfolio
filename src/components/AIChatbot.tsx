"use client";

import { Bot, MessageSquare, Send, X, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatHistoryResponse = {
  success: boolean;
  sessionId?: string;
  messages?: ChatMessage[];
};

type ChatReplyResponse = {
  success: boolean;
  reply?: string;
  sessionId?: string;
  message?: string;
};

const starterSuggestions = [
  "What are your main skills?",
  "Tell me about your latest project.",
  "How can I contact you?",
];

const STORAGE_KEY = "manish-portfolio-chat-session-id";
const STORAGE_NAME_KEY = "manish-portfolio-visitor-name";
const STORAGE_EMAIL_KEY = "manish-portfolio-visitor-email";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Manish’s portfolio assistant. Ask me about skills, projects, experience, or contact details.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingSessionId = window.localStorage.getItem(STORAGE_KEY);
    const nextSessionId = existingSessionId || createSessionId();

    window.localStorage.setItem(STORAGE_KEY, nextSessionId);
    setSessionId(nextSessionId);

    // Load stored visitor info
    const storedName = window.localStorage.getItem(STORAGE_NAME_KEY) || "";
    const storedEmail = window.localStorage.getItem(STORAGE_EMAIL_KEY) || "";
    setVisitorName(storedName);
    setVisitorEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const loadHistory = async () => {
      try {
        const response = await fetch(`/api/chat?sessionId=${encodeURIComponent(sessionId)}`);
        const data = (await response.json()) as ChatHistoryResponse;

        if (!response.ok || !data.success || !data.messages?.length) {
          return;
        }

        setMessages([
          {
            role: "assistant",
            content:
              "Hi, I’m Manish’s portfolio assistant. Ask me about skills, projects, experience, or contact details.",
          },
          ...data.messages,
        ]);
      } catch {
        return;
      }
    };

    void loadHistory();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const messageToSend = (text ?? input).trim();

    if (!messageToSend || loading || !sessionId) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: messageToSend },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          sessionId,
          ...(visitorName && { visitorName }),
          ...(visitorEmail && { visitorEmail }),
        }),
      });

      const data = (await response.json()) as ChatReplyResponse;

      if (!response.ok) {
        throw new Error(data.message || "Unable to answer right now.");
      }

      if (data.sessionId && data.sessionId !== sessionId) {
        window.localStorage.setItem(STORAGE_KEY, data.sessionId);
        setSessionId(data.sessionId);
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply || "Unable to answer right now." },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong while answering.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 transition hover:scale-105 dark:bg-white dark:text-black"
        aria-label="Open AI chatbot"
      >
        {open ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        {open ? "Close Chat" : "Ask AI"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[min(92vw,22rem)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-black/10 dark:border-gray-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Portfolio Assistant
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowVisitorForm(!showVisitorForm)}
              className="inline-flex items-center justify-center rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
              aria-label="Toggle visitor info form"
            >
              {showVisitorForm ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {showVisitorForm && (
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <p className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                Your Info (optional)
              </p>
              <input
                type="text"
                value={visitorName}
                onChange={(e) => {
                  setVisitorName(e.target.value);
                  window.localStorage.setItem(STORAGE_NAME_KEY, e.target.value);
                }}
                placeholder="Name"
                className="mb-2 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-700 dark:text-white dark:focus:border-white"
              />
              <input
                type="email"
                value={visitorEmail}
                onChange={(e) => {
                  setVisitorEmail(e.target.value);
                  window.localStorage.setItem(STORAGE_EMAIL_KEY, e.target.value);
                }}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-700 dark:text-white dark:focus:border-white"
              />
            </div>
          )}

          <div className="max-h-112 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-300">
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition hover:border-black hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something about the portfolio..."
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black dark:border-gray-700 dark:text-white dark:focus:border-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
