import Category from "@/lib/models/categoryModel";
import connectDB from "@/lib/db";

const loadDB = async () => {
    await connectDB();
};
loadDB()

export async function GET(request: Request) {
    try {
        const categories = await Category.find({});
        return new Response(JSON.stringify({ categories }), { status: 200 });
    }catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch categories" }), { status: 500 });
    }
}

