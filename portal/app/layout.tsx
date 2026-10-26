import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Employee Portal | SGB Engineering", template: "%s | SGB Employee Portal" },
  description: "SGB Engineering employee self-service portal."
};

export const dynamic = "force-dynamic";

export default function PortalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>
    <header className="topbar"><div className="shell topbar-inner"><Link className="brand" href="/">SGB Engineering · Employee Portal</Link><a href="https://sgbengg.com">Company website</a></div></header>
    <main className="shell">{children}</main>
  </body></html>;
}
