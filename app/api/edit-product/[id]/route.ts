import Product from "@/lib/models/productModel";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};
loadDB();

// GET request to fetch product details
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT request to update product details
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}
