import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth/context";
import { SignOutForm } from "@/app/components/sign-out";

export default async function EmployeeManagementLayout({ children }: { children: ReactNode }) {
  await requireRole(["HR_ADMIN"]);
  return <><nav className="row" aria-label="Management navigation"><a href="/dashboard">Worker Home</a><a href="/management/employees">Employees</a><a href="/management/access">Access Management</a><SignOutForm /></nav>{children}</>;
}
