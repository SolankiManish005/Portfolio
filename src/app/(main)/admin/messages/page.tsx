import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import MessagesTable, { Message } from "../../../components/MessagesTable";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const client = await clientPromise;
  const db = client.db("portfolioDB");

  const messagesFromDb = await db
    .collection("contacts")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const messages: Message[] = messagesFromDb.map((msg) => ({
    _id: msg._id.toString(),
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    createdAt: msg.createdAt,
  }));

  return (
    <section className="px-6 py-12">
      <MessagesTable messages={messages} />
    </section>
  );
}
