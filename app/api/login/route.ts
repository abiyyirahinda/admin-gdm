import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request){
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
        return new NextResponse("Missing email or password", { status: 400 });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ message: 'Login successful', success: true }, {status: 200})
    } else {
        return NextResponse.json({ message: 'Invalid email or password',success: false }, {status: 401})
    }

}
