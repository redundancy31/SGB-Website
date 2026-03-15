import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { company } from "@/data/company";
import { Button } from "@/components/ui/button";

export function MobileStickyCTA() {
  return (
    <div className="fixed bottom-3 left-3 right-3 z-30 rounded-lg border border-slate-200 bg-white p-2 shadow-soft lg:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
          <Button size="sm" variant="outline" className="w-full">
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </a>
        <a href={`mailto:${company.email}`}>
          <Button size="sm" variant="outline" className="w-full">
            <Mail className="h-4 w-4" />
            Email
          </Button>
        </a>
        <Link href="/contact">
          <Button size="sm" className="w-full">
            Consult
          </Button>
        </Link>
      </div>
    </div>
  );
}
