import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import MessagesTable, { Message } from "@/components/MessagesTable";
import Contact from "@/models/Contact";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();

  const messagesFromDb = await Contact.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .lean();

  const messages: Message[] = messagesFromDb.map((msg) => ({
    _id: msg._id.toString(),
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    createdAt: msg.createdAt.toISOString(),
  }));

  return (
    <section className="px-6 py-12">
      <MessagesTable messages={messages} />
    </section>
  );
}
