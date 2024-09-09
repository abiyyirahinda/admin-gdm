import Billboard from "@/lib/models/billboardModel";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await connectDB();
};
loadDB();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const billboard = await Billboard.findById(params.id);
      if (!billboard) {
        return NextResponse.json({ message: "Billboard not found" }, { status: 404 });
      }      
      return NextResponse.json(billboard, { status: 200 });
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ message: "Failed to fetch billboard" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedBillboard = await Billboard.findByIdAndUpdate(params.id, body, { new: true });
        if (!updatedBillboard) {
            return NextResponse.json({ message: "Billboard not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Billboard updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json({ message: "Failed to update billboard" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedBillboard = await Billboard.findByIdAndDelete(params.id);
        if (!deletedBillboard) {
            return NextResponse.json({ message: "Billboard not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Billboard deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json({ message: "Failed to delete billboard" }, { status: 500 });
    }
}
