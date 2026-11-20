import { AuthLayout } from "@/auth/AuthLayout";
import { PasswordInput } from "@/auth/PasswordInput";
import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const registeredEmail = typeof state?.registeredEmail === "string" ? state.registeredEmail : "";
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: registeredEmail, password: "" },
  });

  async function signIn(values: z.infer<typeof schema>) {
    try {
      const { data } = await axios.post<{ token: string }>(
        (import.meta.env.VITE_API_URL ?? "") + "/api/auth/login",
        values,
      );
      login(data.token, values.email);
      navigate("/dashboard");
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error) && error.response?.data?.message;
      setError("root", { message: message || "Could not sign in. Try again." });
    }
  }

  return (
    <AuthLayout mode="login" title="Sign in" description="Pick up your CV where you left off.">
      {registeredEmail && <p role="status" className="mb-4 rounded border border-primary/25 bg-primary/5 px-3 py-2 text-sm text-primary">Your account is ready. Sign in to create your CV.</p>}
      <form noValidate className="space-y-4" onSubmit={handleSubmit(signIn)}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email address</Label>
          <Input id="login-email" type="email" autoComplete="username" placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "login-email-error" : undefined} {...register("email")} />
          {errors.email && <p id="login-email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <PasswordInput id="login-password" autoComplete="current-password" aria-invalid={!!errors.password} aria-describedby={errors.password ? "login-password-error" : undefined} {...register("password")} />
          {errors.password && <p id="login-password-error" role="alert" className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        {errors.root?.message && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 h-11 w-full justify-between px-4">
          {isSubmitting ? "Signing in…" : "Sign in"}
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </Button>
      </form>
      <p className="mt-6 border-t pt-5 text-sm text-muted-foreground">
        New to Easy CV?{" "}
        <Link to="/register" className="font-semibold text-primary underline underline-offset-4">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
