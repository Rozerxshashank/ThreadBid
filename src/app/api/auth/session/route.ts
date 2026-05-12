import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Cryptographic Seed Secret for HMAC production signatures
const SESSION_SECRET = process.env.SESSION_SECRET || "enterprise_threadbid_secure_signature_key_2026";

// Simple Edge-Compatible custom JWT/HMAC token builder using Web Crypto API
async function signToken(payload: object): Promise<string> {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const data = btoa(JSON.stringify(payload));
  
  // Create native CryptoKey using Web Crypto API supported perfectly in Next.js Edge and Node runtimes
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${header}.${data}`)
  );
  
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
  return `${header}.${data}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: "Missing identity credentials" }, { status: 400 });
    }

    const tokenPayload = {
      sub: email,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days expiration
    };

    const secureToken = await signToken(tokenPayload);
    const cookieStore = await cookies();

    // Set cryptographically secure HTTP-Only session token
    cookieStore.set("threadbid_session", secureToken, {
      httpOnly: true, // Absolutely blocked from client JavaScript manipulation
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400 * 7,
    });

    // We also set a highly restricted read-only visual presentation role indicator for layout styling loops
    cookieStore.set("threadbid_role", role, {
      httpOnly: false, // Accessible by UI layout hooks strictly for showing/hiding dashboard strings
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400 * 7,
    });

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error("Session serialization error:", error);
    return NextResponse.json({ error: "Internal Server Authorization Fault" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("threadbid_session");
  cookieStore.delete("threadbid_role");
  return NextResponse.json({ success: true });
}
