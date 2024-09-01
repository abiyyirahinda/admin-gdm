import connectDB from "@/lib/db";
import Product from "@/lib/models/productModel";
const loadDB = async () => {
  await connectDB();
}
loadDB();
export async function GET(request: Request) {
    try{
        const products = await Product.find({});
        return new Response(JSON.stringify(products), { status: 200 })
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch products" }), { status: 500 });
    }
}