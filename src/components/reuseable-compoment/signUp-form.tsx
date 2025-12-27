"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signUp } from "@/action/auth-action";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

type SignupFormValues = z.infer<typeof formSchema>;
interface SignUpFormProps extends React.ComponentProps<"div"> {
  onClose?: () => void;
}
export function SignupForm({ className, onClose, ...props }: SignUpFormProps) {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await signUp(values);
      if (data) {
        toast.success("Account created successfully!");
        // router.push("/sign-in");
        onClose?.();
      } else {
        toast.error("Sign-up failed", {
          description: error.message,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while signing up");
    }
  };

  return (
    <Card
      className={cn(
        "w-full max-w-lg mx-auto border-none shadow-none p-0 m-0",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-start text-2xl capitalize">
          Create your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="9876543210"
                      {...field}
                      type="number"
                      maxLength={10}
                      pattern="\d{10}"
                      inputMode="numeric"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-center gap-1 text-sm text-muted-foreground">
        <p>Already have an account?</p>
        <Button
          variant="link"
          className="px-1 text-primary"
          onClick={() => router.push("/sign-in")}
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
