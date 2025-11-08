import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

  // Si aucune variable d'environnement -> désactivation silencieuse
  if (!correctPassword) {
    console.warn(" PAGE_ACCESS_PASSWORD non défini : protection désactivée.");
    return NextResponse.json({ success: true, message: "Protection disabled" }, { status: 200 });
  }

  // Si le mot de passe est correct
  if (password === correctPassword) {
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("authToken", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 heure
        sameSite: "strict",
        path: "/",
      })
    );
    return response;
  }

  // Sinon mauvais mot de passe
  return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
}