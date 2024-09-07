import connectDB from "@/lib/db";
import Size from "@/lib/models/sizeModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};
loadDB()
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await Size.create(body);
    return NextResponse.json({ message: "Size created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Failed to create size" }, { status: 500 });
  }
}
