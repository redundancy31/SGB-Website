import type { ReactNode } from "react";
import { requirePortalContext } from "@/lib/auth/context";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  await requirePortalContext();
  return children;
}
