import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
    }

    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}

