"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Copy, Check } from "lucide-react";

type Conversation = {
  _id: string;
  sessionId: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorIP?: string;
  messages: Array<{ role: string; content: string }>;
  createdAt: string;
  updatedAt: string;
};

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("/api/admin/conversations");
        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }
        const data = await response.json();
        setConversations(data.conversations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void fetchConversations();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const exportToSheets = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/admin/export-to-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversations }),
      });

      if (!response.ok) {
        throw new Error("Failed to export to sheets");
      }

      const data = await response.json();
      alert(`✓ Exported ${data.rowsAdded} rows to Google Sheets!`);
    } catch (err) {
      alert(
        `Error: ${err instanceof Error ? err.message : "Failed to export"}`,
      );
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-gray-400">
          Loading conversations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chat Conversations
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {conversations.length} total
              {conversations.length > 0 &&
                ` • ${conversations.filter((c) => c.visitorName || c.visitorEmail).length} with visitor info`}
            </p>
          </div>
          <button
            onClick={exportToSheets}
            disabled={exporting || conversations.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {exporting ? "Exporting..." : "Export All to Sheets"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-900 dark:bg-red-900/20 dark:text-red-400">
            Error: {error}
          </div>
        )}

        {conversations.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              No conversations yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Visitor Info
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    IP Address
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Messages
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Last Updated
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {conversations.map((conv) => (
                  <tr
                    key={conv._id}
                    className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {conv.visitorName || "Anonymous"}
                        </p>
                        {conv.visitorEmail && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {conv.visitorEmail}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          ID: {conv.sessionId.slice(0, 8)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                          {conv.visitorIP || "—"}
                        </code>
                        {conv.visitorIP && conv.visitorIP !== "unknown" && (
                          <button
                            onClick={() =>
                              copyToClipboard(conv.visitorIP || "", conv._id)
                            }
                            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            title="Copy IP"
                          >
                            {copiedId === conv._id ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3 text-gray-400" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {conv.messages.length}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(conv.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/admin/conversations/${conv._id}`}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
