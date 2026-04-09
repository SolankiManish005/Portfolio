"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type Conversation = {
  _id: string;
  sessionId: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorIP?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

export default function ConversationDetailPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(
          `/api/admin/conversations/${conversationId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch conversation");
        }
        const data = await response.json();
        setConversation(data.conversation);
      } catch (err) {
        console.error("Failed to fetch conversation:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchConversation();
  }, [conversationId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Conversation not found
        </p>
        <Link
          href="/admin/conversations"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Back to conversations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/conversations"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to conversations
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conversation Details
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Visitor Name
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {conversation.visitorName || "Anonymous"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Email
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {conversation.visitorEmail || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                IP Address
              </p>
              <div className="flex items-center gap-2">
                <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800 text-gray-900 dark:text-white">
                  {conversation.visitorIP || "unknown"}
                </code>
                {conversation.visitorIP &&
                  conversation.visitorIP !== "unknown" && (
                    <button
                      onClick={() =>
                        copyToClipboard(conversation.visitorIP || "")
                      }
                      className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {copiedId === conversation.visitorIP ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  )}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Session ID
              </p>
              <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
                {conversation.sessionId}
              </code>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Messages
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {conversation.messages.length}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Last Updated
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {new Date(conversation.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Messages
          </h2>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {conversation.messages.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No messages</p>
            ) : (
              conversation.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                    {message.role}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
