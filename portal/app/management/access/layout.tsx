import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth/context";
import { SignOutForm } from "@/app/components/sign-out";

export default async function AccessManagementLayout({ children }: { children: ReactNode }) {
  await requireRole(["HR_ADMIN", "PLATFORM_ADMIN"]);
  return <><nav className="row" aria-label="Access management"><a href="/dashboard">Worker Home</a><a href="/management/employees">Employee Management</a><SignOutForm /></nav>{children}</>;
}
