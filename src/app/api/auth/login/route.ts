import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Official Demo Officer Account
    if (cleanEmail === "demo@bisassist.ai" && cleanPassword === "demo123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "usr-demo-01",
          name: "Rajesh Sharma",
          email: "demo@bisassist.ai",
          organization: "Bharat Electronics & Consumer Goods Ltd.",
          role: "Senior Compliance Officer",
          licenseNumber: "CM/L-8472910",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        token: "bis-jwt-auth-token-demo-officer-valid",
        message: "Successfully signed in as Senior Compliance Officer"
      });
    }

    // 2. Custom User / Enterprise login simulation
    if (cleanEmail && cleanPassword.length >= 4) {
      const generatedName = cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
      return NextResponse.json({
        success: true,
        user: {
          id: `usr-${Date.now()}`,
          name: generatedName || "Enterprise User",
          email: cleanEmail,
          organization: "Standard Conformity Labs",
          role: "Quality Assurance Specialist",
          licenseNumber: `CM/L-${Math.floor(1000000 + Math.random() * 9000000)}`
        },
        token: `bis-jwt-auth-token-${Date.now()}`,
        message: `Welcome back, ${generatedName}!`
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid email or password. Password must be at least 4 characters."
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server authentication error occurred." },
      { status: 500 }
    );
  }
}
