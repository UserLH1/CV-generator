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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg border border-gray-300 rounded-lg bg-white p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Login to your account</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <p className="text-sm text-gray-600">
              <a href="link" className="text-blue-500 hover:underline">Forgot password?</a>
            </p>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">Create an account</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
  
  
  
}