"use client";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/services/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
const formSchema = z.object({
name: z.string().min(2, {
message: "Name must be at least 2 characters.",
}),
email: z.string().email({
message: "Please enter a valid email address.",
}),
password: z.string().min(8, {
message: "Password must be at least 8 characters.",
}),
terms: z.boolean().refine((val) => val === false, {
message: "You must agree to the terms and conditions.",
}),
});
export function RegisterFormComponent() {
const [isLoading, setIsLoading] = useState(false);
const form = useForm<z.infer<typeof formSchema>>({
resolver: zodResolver(formSchema),
defaultValues: {name: "",
email: "",
password: "",
terms: false,
},
});
const navigate = useNavigate();
async function onSubmit(values: z.infer<typeof formSchema>) {
setIsLoading(true);
try {
const response = await axios.post(
`${import.meta.env.VITE_API_URL ?? ""}/api/auth/register`, // Use VITE_API_URL here
{
name: values.name,
email: values.email,
password: values.password,
}
);
if (response.status === 201) {
alert("Registration Successful");
toast({
title: "Registration Successful",
description: "You have successfully registered an account.",
});
form.reset(); // Reset form on success
navigate("/login");
}
} catch (error: any) {
if (
error.response &&
error.response.data &&
error.response.data.message
) {
toast({
title: "Error",
description: error.response.data.message || "Registration failed.",
});
} else {
toast({
title: "Error",
description: "An unknown error occurred.",
});}
} finally {
setIsLoading(false);
}
}
return (
<div className="flex flex-col md:flex-row h-screen">
{/* Fundal static cu imagine completă */}
<div
className="hidden md:block w-1/2 h-full bg-center bg-contain bg-no-repeat"
style={{ backgroundImage: "url('https://c8.alamy.com/comp/CXN3HJ/cv-curriculumvitae-concept-in-word-tag-cloud-on-white-background-CXN3HJ.jpg')" }}
></div>
<div className="md:w-1/2 w-full flex items-center justify-center min-h-screen p-4 bggray-100">
<Card className="w-full max-w-md shadow-lg border border-border rounded-lg bg-card p-6">
<CardHeader className="text-center">
<CardTitle className="text-2xl font-bold font-serif text-primary">
Create an account
</CardTitle>
<CardDescription className="text-muted-foreground">
Enter your details to register
</CardDescription>
</CardHeader>
<form onSubmit={form.handleSubmit(onSubmit)}>
<CardContent className="space-y-4">
<div className="space-y-2">
<Label htmlFor="name" className="text-foreground">
Name
</Label>
<Input
id="name"
type="text"
placeholder="John Doe"
className="w-full border border-border rounded-lg p-2 focus:outline-none
focus:ring-2 focus:ring-ring"
{...form.register("name")}
/>
{form.formState.errors.name && (
<p className="text-sm text-destructive">
{form.formState.errors.name.message}</p>
)}
</div>
<div className="space-y-2">
<Label htmlFor="email" className="text-foreground">
Email
</Label>
<Input
id="email"
type="email"
placeholder="john@example.com"
className="w-full border border-border rounded-lg p-2 focus:outline-none
focus:ring-2 focus:ring-ring"
{...form.register("email")}
/>
{form.formState.errors.email && (
<p className="text-sm text-destructive">
{form.formState.errors.email.message}
</p>
)}
</div>
<div className="space-y-2">
<Label htmlFor="password" className="text-foreground">
Password
</Label>
<Input
id="password"
type="password"
className="w-full border border-border rounded-lg p-2 focus:outline-none
focus:ring-2 focus:ring-ring"
{...form.register("password")}
/>
{form.formState.errors.password && (
<p className="text-sm text-destructive">
{form.formState.errors.password.message}
</p>
)}
</div>
<div className="flex items-center space-x-2">
<Checkbox id="terms" {...form.register("terms")} />
<Label htmlFor="terms" className="text-sm">
I agree to the terms and conditions
</Label>
</div>{form.formState.errors.terms && (
<p className="text-sm text-destructive">
{form.formState.errors.terms.message}
</p>
)}
</CardContent>
<CardFooter className="flex flex-col space-y-4">
<Button
type="submit"
className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg"
disabled={isLoading}
>{
isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
Register
</Button>
<p className="text-sm text-muted-foreground text-center">
Already have an account?{" "}
<a href="/login" className="text-primary hover:underline">
Log in
</a>
</p>
</CardFooter>
</form>
</Card>
</div>
</div>
);
}