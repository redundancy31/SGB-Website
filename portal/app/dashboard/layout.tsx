import type { ReactNode } from "react";
import Link from "next/link";
import { requirePortalContext } from "@/lib/auth/context";
import { SignOutForm } from "@/app/components/sign-out";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const context = await requirePortalContext();
  return <><nav className="row" aria-label="Worker navigation"><Link href="/dashboard">Home</Link><Link href="/account">My Profile</Link><Link href="/account/security">Account &amp; Security</Link>{context.roles.includes("HR_ADMIN") && <Link href="/management/employees">Employee Management</Link>}<SignOutForm /></nav>{children}</>;
}
