// lib/auth/auth.ts (or wherever your betterAuth instance is)
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/database";
import { nextCookies } from "better-auth/next-js";
import { resend } from "@/lib/email";
import { customSession } from "better-auth/plugins/custom-session";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        await resend.emails.send({
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
      }
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  trustedOrigins: ["http://localhost:3000"],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      type: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // prevents users from setting it during signup
      },
    },
  },
  plugins: [
    nextCookies(),
    customSession(async ({ user }) => {
      // This ensures `type` is always included in the session/user object
      return {
        user: {
          ...user,
          type: user.type,
        },
      };
    }),
  ],
});