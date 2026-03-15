"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
};

export function FAQSection({ items }: FAQSectionProps) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="section-space section-subtle">
      <div className="container-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Procurement and Project Questions"
          description="Placeholder answers to support early due diligence before detailed discussions."
        />
        <div className="mt-8 space-y-3">
          {items.map((item, idx) => {
            const isOpen = active === idx;
            return (
              <Card key={item.question} className="overflow-hidden border-slate-200 shadow-none">
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setActive(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-primary sm:text-base">{item.question}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen ? <p className="border-t border-slate-200 px-5 py-4 text-sm text-muted-foreground">{item.answer}</p> : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
