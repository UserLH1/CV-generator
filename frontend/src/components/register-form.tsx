import { AuthLayout } from "@/auth/AuthLayout";
import { PasswordInput } from "@/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters.")
    .refine((value) => new TextEncoder().encode(value).length <= 72, "Choose a shorter password."),
});

export function RegisterFormComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function createAccount(values: z.infer<typeof schema>) {
    try {
      await axios.post((import.meta.env.VITE_API_URL ?? "") + "/api/auth/register", values);
      navigate("/login", { state: { registeredEmail: values.email }, replace: true });
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error) && error.response?.data?.message;
      setError("root", { message: message || "Could not create your account. Try again." });
    }
  }

  return (
    <AuthLayout mode="register" title="Create an account" description="Save your first draft and return to it whenever you need.">
      <form noValidate className="space-y-4" onSubmit={handleSubmit(createAccount)}>
        <div className="space-y-2">
          <Label htmlFor="register-name">Full name</Label>
          <Input id="register-name" autoComplete="name" placeholder="John Doe" aria-invalid={!!errors.name} aria-describedby={errors.name ? "register-name-error" : undefined} {...register("name")} />
          {errors.name && <p id="register-name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email address</Label>
          <Input id="register-email" type="email" autoComplete="email" placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "register-email-error" : undefined} {...register("email")} />
          {errors.email && <p id="register-email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <PasswordInput id="register-password" autoComplete="new-password" aria-invalid={!!errors.password} aria-describedby="register-password-hint" {...register("password")} />
          <p id="register-password-hint" role={errors.password ? "alert" : undefined} className={errors.password ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
            {errors.password?.message || "Use at least 8 characters."}
          </p>
        </div>
        {errors.root?.message && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 h-11 w-full justify-between px-4">
          {isSubmitting ? "Creating account…" : "Create account"}
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </Button>
      </form>
      <p className="mt-6 border-t pt-5 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary underline underline-offset-4">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
