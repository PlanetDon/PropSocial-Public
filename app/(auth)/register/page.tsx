import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
        <p className="text-sm text-slate-600">
          Set up your profile to browse, verify, and invest securely.
        </p>
      </header>
      <RegisterForm />
      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[--color-primary-700] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
