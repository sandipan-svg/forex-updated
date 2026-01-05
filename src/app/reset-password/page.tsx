"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { resetPassword } from "@/action/auth-action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetFormValues) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      const { error } = await resetPassword(values.password, token);
      if (error) {
        toast.error("Reset failed", { description: error.message });
        return;
      }
      toast.success("Password updated!", { description: "You can now sign in with your new password." });
      // Redirect to sign-in
      window.location.href = "/";
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!token) {
    return <p className="text-center">Invalid reset link.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Set New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}