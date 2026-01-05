import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // ← Import Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forex App",
  description: "Your Forex trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Sonner Toaster - shows all toasts globally */}
        <Toaster
          position="top-center"     // Best for most apps
          closeButton               // Adds an X to dismiss
          richColors                // Makes success green, error red, etc.
          expand                    // Stacks multiple toasts nicely
          duration={8000}           // Longer duration for important messages
          toastOptions={{
            style: {
              fontSize: "0.95rem",
            },
          }}
        />
      </body>
    </html>
  );
}