"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ← Add this
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "@/action/auth-action";

// Define Zod schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password is too long"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter(); // ← For navigation

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Navigate to forgot password page
  const openForgot = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/forgot-password");
  };

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const { data, error } = await signIn(values);
      if (error) {
        toast.error("Sign-in failed", {
          description: error.message || "Invalid email or password",
        });
        return;
      }
      toast.success("Signed in successfully!", {
        description: "Welcome back!",
      });
      onClose?.();
      // Fetch the session to get user type
      const sessionResp = await fetch("/api/session", {
        credentials: "include",
      });
      const sessionData = await sessionResp.json();
      const userType = sessionData?.user?.type?.toLowerCase();
      // console.log("User type:", userType);
      // console.log("User data:", data.user);

      if (userType === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/profile"); // or "/dashboard", "/home", etc.
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Sign-in failed", {
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-none border-none m-0 p-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm text-blue-600 underline-offset-4 hover:underline"
                        onClick={openForgot}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground text-center">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
