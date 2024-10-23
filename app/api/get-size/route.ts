import Size from "@/lib/models/sizeModel";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};

export async function GET(request: Request) {
  try {
    // sort by sizeValue
    const sizes = await Size.find({}).sort({ sizeValue: 1 });
    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ message: "Failed to get sizes" }, { status: 500 });
  }
}
