import Category from "@/lib/models/categoryModel";
import connectDB from "@/lib/db";

const loadDB = async () => {
    await connectDB();
};
loadDB()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const category = await Category.findById(params.id);
        return new Response(JSON.stringify({ category }), { status: 200 });
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch category" }), { status: 500 });
    }
}