import Link from "next/link";

import { company, navLinks } from "@/data/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-primary">{company.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{company.address}</p>
            <p className="mt-2 text-sm text-muted-foreground">Established {company.establishedYear}</p>
            <p className="mt-1 text-sm text-muted-foreground">{company.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-primary">
                  {company.email}
                </a>
              </li>
              <li>{company.operatingHours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
