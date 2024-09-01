import Product from "@/lib/models/productModel";
import connectDB from "@/lib/db";

const loadDB = async () => {
  await connectDB();
}
loadDB();
export async function POST(request: Request) {
  try {
    const body = await request.json();

    await Product.create(body);
    return new Response(
      JSON.stringify({ message: "Product created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create product" }),
      { status: 500 }
    );
  }
}
