import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";

// GET — vérifie si l'utilisateur est déjà authentifié
export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);

  // Si aucune protection active → considéré comme authentifié
  if (!process.env.PAGE_ACCESS_PASSWORD) {
    return NextResponse.json({ authenticated: true, message: "Protection disabled" }, { status: 200 });
  }

  // Si cookie valide
  if (cookies.authToken === "authenticated") {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }

  // Sinon non authentifié
  return NextResponse.json({ authenticated: false }, { status: 401 });
}