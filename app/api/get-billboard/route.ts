import connectDB from "@/lib/db";
import Billboard from "@/lib/models/billboardModel";

const loadDB = async () => {
  await connectDB();
};
loadDB();

export async function GET(request: Request) {
  try {
    const billboards = await Billboard.find({});
    return new Response(JSON.stringify({ billboards }), { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch billboards" }), { status: 500 });
  }
}
