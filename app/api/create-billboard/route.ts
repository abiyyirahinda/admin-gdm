import Billboard from "@/lib/models/billboardModel";
import connectDB from "@/lib/db";

const loadDB = async () => {
    await connectDB();
}
loadDB();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body)
        await Billboard.create(body);
        return new Response(
            JSON.stringify({ message: "Billboard created successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error POST creating billboard:", error);
        return new Response(
            JSON.stringify({ message: "Failed to create billboard" }),
            { status: 500 }
        );
    }
}