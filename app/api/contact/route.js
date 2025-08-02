import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({
        success: false,
        message: "All fields are required",
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("portfolioDB"); // ✅ your custom DB name
    const collection = db.collection("contacts"); // ✅ auto-created

    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    });

    return Response.json({
      success: true,
      message: "Message saved successfully",
      result,
    });
  } catch (error) {
    console.error("❌ API contact error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
