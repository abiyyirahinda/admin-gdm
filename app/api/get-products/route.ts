import connectDB from "@/lib/db";
import Product from "@/lib/models/productModel";
const loadDB = async () => {
  await connectDB();
}
loadDB();
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const products = await Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Product.countDocuments({});

        return new Response(JSON.stringify({ products, total }), { status: 200 });
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch products" }), { status: 500 });
    }
}
