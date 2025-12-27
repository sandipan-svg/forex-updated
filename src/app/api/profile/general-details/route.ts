// app/api/profile/general-details/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch profile data from UserProfile
  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phoneCode: true,
      phone: true,
      dob: true,
      gender: true,
      country: true,
      language: true,
    },
  });

  // Fetch the profile image from the main User table
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  // Combine both and return
  return NextResponse.json({
    // Spread profile fields (may be null if no profile yet)
    ...(profile ?? {
      firstName: "",
      lastName: "",
      email: session.user.email || "",
      phoneCode: "+91",
      phone: "",
      dob: null,
      gender: "",
      country: "India",
      language: "English",
    }),
    // Add the image URL from User table
    image: user?.image || null,
  });
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: {
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      email: data.email,
      phoneCode: data.phoneCode || "+91",
      phone: data.phone?.replace(/[^\d]/g, ""),
      dob: data.dob ? new Date(data.dob) : null,
      gender: data.gender || null,
      country: data.country || null,
      language: data.language || null,
    },
    create: {
      userId: session.user.id,
      firstName: data.firstName?.trim() || "",
      lastName: data.lastName?.trim() || "",
      email: data.email || session.user.email || "",
      phoneCode: data.phoneCode || "+91",
      phone: data.phone?.replace(/[^\d]/g, "") || "",
      dob: data.dob ? new Date(data.dob) : null,
      gender: data.gender || null,
      country: data.country || "India",
      language: data.language || "English",
    },
  });

  return NextResponse.json({ success: true });
}