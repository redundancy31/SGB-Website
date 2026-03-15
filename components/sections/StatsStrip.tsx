import { Card } from "@/components/ui/card";

type Stat = {
  value: string;
  label: string;
};

type StatsStripProps = {
  stats: Stat[];
};

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.label} className="border-slate-200 bg-white p-5 shadow-none">
          <p className="text-2xl font-bold text-primary">{item.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </Card>
      ))}
    </div>
  );
}
