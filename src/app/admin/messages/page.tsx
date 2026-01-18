import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const client = await clientPromise;
  const db = client.db("portfolioDB");
  const messages = await db
    .collection("contacts")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">📬 Messages</h1>

      <div className="space-y-4">
        {messages.map((msg: any) => (
          <div key={msg._id} className="border border-gray-700 p-4 rounded">
            <p className="font-semibold">{msg.name}</p>
            <p className="text-sm text-gray-400">{msg.email}</p>
            <p className="mt-2 font-medium">{msg.subject}</p>
            <p className="mt-1">{msg.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
