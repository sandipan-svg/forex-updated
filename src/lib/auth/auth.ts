import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/database";
import { nextCookies } from "better-auth/next-js";
import { resend } from "@/lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        await resend.emails.send({
          // Use your verified domain here!
          from: "Forex <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset Your Password",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="text-align: center; color: #1f2937;">Password Reset Request</h2>
              <p>Hello ${user.name ?? "there"},</p>
              <p>We received a request to reset your password for your Forex account.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a 
                  href="${url}" 
                  style="background-color: #2563eb; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;"
                >
                  Reset Password
                </a>
              </div>
              <p><small>This link will expire in 1 hour.</small></p>
              <p>If you didn't request this, ignore this email.</p>
            </div>
          `,
        });
      } catch (error) {
        console.error("Failed to send reset password email:", error);
        // Optional: throw error or handle it
      }
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  plugins: [nextCookies()],
  trustedOrigins: ["http://localhost:3000"],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});