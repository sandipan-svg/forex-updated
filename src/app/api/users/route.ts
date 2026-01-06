// app/api/users/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/database"; // Adjust path if your file is named differently, e.g., "@/lib/prisma" or "@/lib/db"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        type: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format dates as strings if needed (optional, but helps with consistency)
    const formattedUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}