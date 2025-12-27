// app/api/profile/delivery-address/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.userDeliveryAddress.findUnique({
    where: { userId: session.user.id },
    select: {
      fullName: true,
      phone: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      pincode: true,
      country: true,
    },
  });

  return NextResponse.json(address ?? {
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  await prisma.userDeliveryAddress.upsert({
    where: { userId: session.user.id },
    update: {
      fullName: data.fullName?.trim() || "",
      phone: data.phone?.trim() || "",
      addressLine1: data.addressLine1?.trim() || "",
      addressLine2: data.addressLine2?.trim(),
      city: data.city?.trim() || "",
      state: data.state?.trim() || "",
      pincode: data.pincode?.trim() || "",
      country: data.country || "India",
    },
    create: {
      userId: session.user.id,
      fullName: data.fullName?.trim() || "",
      phone: data.phone?.trim() || "",
      addressLine1: data.addressLine1?.trim() || "",
      addressLine2: data.addressLine2?.trim() || "",
      city: data.city?.trim() || "",
      state: data.state?.trim() || "",
      pincode: data.pincode?.trim() || "",
      country: data.country || "India",
    },
  });

  return NextResponse.json({ success: true });
}