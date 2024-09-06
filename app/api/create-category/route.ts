import connectDB from "@/lib/db";
import Category from "@/lib/models/categoryModel";

const loadDB = async () => {
    await connectDB();
};

loadDB()

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await Category.create(body);
        return new Response(
            JSON.stringify({ message: "Category created successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error POST creating category:", error);
        return new Response(
            JSON.stringify({ message: "Failed to create category" }),
            { status: 500 }
        );
    }
}