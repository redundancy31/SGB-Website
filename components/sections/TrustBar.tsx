import { BadgeCheck, Building2, MapPinned, ShieldCheck, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

const iconMap = [Building2, MapPinned, ShieldCheck, BadgeCheck, Users, Building2];

type TrustBarProps = {
  items: string[];
};

export function TrustBar({ items }: TrustBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, idx) => {
        const Icon = iconMap[idx % iconMap.length];
        return (
          <Card key={item} className="border-slate-200 bg-white p-3 shadow-none">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" />
              <p className="text-xs font-medium text-foreground lg:text-[13px]">{item}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
