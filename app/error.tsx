"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-semibold text-slate-900">Something went wrong</h2>
      <p className="text-sm text-slate-600">
        We captured the error and your session is still safe. Retry or refresh to continue.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
