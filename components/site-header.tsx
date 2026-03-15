import Link from "next/link";

import { MobileNav } from "@/components/MobileNav";
import { company, navLinks } from "@/data/company";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SGB Engineering and Trading home">
          <img src="/sgb-logo.png" alt="SGB Engineering logo" className="h-10 w-10 rounded-md object-contain" />
          <div>
            <p className="text-sm font-semibold leading-tight text-primary">{company.name}</p>
            <p className="text-[11px] text-muted-foreground">Company Profile & Capability Overview</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden md:inline-flex">
            <Button size="sm">Request a Consultation</Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
