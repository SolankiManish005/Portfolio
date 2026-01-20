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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="border px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-900">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Subject</th>
              <th className="border px-4 py-2 text-left">Message</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} className="hover:bg-gray-800">
                <td className="border px-4 py-2">{msg.name}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.subject}</td>
                <td className="border px-4 py-2 max-w-md truncate">
                  {msg.message}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-500 hover:underline"
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
