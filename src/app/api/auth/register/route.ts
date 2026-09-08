import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, organization, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 4 characters." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const userRole = role || "Compliance Engineer";
    const userOrg = organization || "Indian Manufacturing Enterprise";
    const licenseNumber = `CM/L-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newUser = {
      id: `usr-reg-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      organization: userOrg.trim(),
      role: userRole,
      licenseNumber: licenseNumber,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      user: newUser,
      token: `bis-jwt-auth-token-reg-${Date.now()}`,
      message: `Account created successfully for ${name}!`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process registration." },
      { status: 500 }
    );
  }
}
