import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Unauthorized</h1>
      <p className="text-sm text-slate-600">
        You do not have permission for this route. Please sign in with the correct role.
      </p>
      <Button asChild>
        <Link href="/login">Go to login</Link>
      </Button>
    </div>
  );
}
