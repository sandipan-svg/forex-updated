// app/api/profile/upload-avatar/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("avatar") as File;

  if (!file || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${session.user.id}-${Date.now()}.${file.type.split("/")[1]}`;
  const filepath = path.join(process.cwd(), "public", "uploads", "avatars", filename);

  // Ensure directory exists (create it in your project: public/uploads/avatars)
  await writeFile(filepath, buffer);

  const imageUrl = `/uploads/avatars/${filename}`;

  // Optional: Save path in User model
  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: imageUrl },
  });

  return NextResponse.json({ imageUrl });
}