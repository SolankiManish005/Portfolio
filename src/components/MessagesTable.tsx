"use client";
import { signOut } from "next-auth/react";
export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessagesTable({ messages }: { messages: Message[] }) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="border border-gray-300 dark:border-neutral-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              {["Name", "Email", "Subject", "Message", "Date", "Action"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-neutral-700"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-neutral-900">
            {messages.map((msg) => (
              <tr
                key={msg._id}
                className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
              >
                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-gray-800 dark:text-gray-100">
                  {msg.name}
                </td>

                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-300">
                  {msg.email}
                </td>

                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-200">
                  {msg.subject}
                </td>

                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-300 max-w-md truncate">
                  {msg.message}
                </td>

                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-sm text-gray-500 dark:text-gray-400">
                  {msg.createdAt ? formatDate(msg.createdAt) : "N/A"}
                </td>

                <td className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800 text-center">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
