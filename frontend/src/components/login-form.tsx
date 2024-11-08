"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      interface LoginResponse {
        token: string;
      }

      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/api/auth/login`, // Corrected API URL
        {
          email: values.email,
          password: values.password,
        }
      );

      const token: string = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage or context
      localStorage.setItem("user", values.email); // Store user in localStorage or context
      console.log("Token:", token);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });

      form.reset();
      console.log("Navigating to dashboard...");
      console.log("token", localStorage.getItem("token"));
      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast({
          title: "Login Failed",
          description: error.response.data.message || "Invalid credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          <Button variant="link" className="text-sm">
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}