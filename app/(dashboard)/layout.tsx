import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ps_access_token")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return <AppShell>{children}</AppShell>;
}
