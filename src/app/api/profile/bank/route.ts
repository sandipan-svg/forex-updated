// app/api/profile/bank/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bank = await prisma.userBank.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(bank ?? {});
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  await prisma.userBank.upsert({
    where: { userId: session.user.id },
    update: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifsc: data.ifsc?.toUpperCase(),
      holderName: data.holderName,
    },
    create: {
      userId: session.user.id,
      bankName: data.bankName || "",
      accountNumber: data.accountNumber || "",
      ifsc: data.ifsc?.toUpperCase() || "",
      holderName: data.holderName || "",
    },
  });

  return NextResponse.json({ success: true });
}