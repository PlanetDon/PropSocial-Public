import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
        <p className="text-sm text-slate-600">Access your secure PropSocial workspace.</p>
      </header>
      <LoginForm />
      <p className="text-sm text-slate-600">
        New here?{" "}
        <Link href="/register" className="font-medium text-[--color-primary-700] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
