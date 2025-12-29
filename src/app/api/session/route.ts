// app/api/session/route.ts
import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  return NextResponse.json(session);
}
