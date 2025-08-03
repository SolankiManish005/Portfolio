import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolioDB");
    const collection = db.collection("contacts");

    const result = await collection.insertOne(body);

    return Response.json({
      success: true,
      message: "Contact saved",
      result,
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    }, { status: 500 });
  }
}
