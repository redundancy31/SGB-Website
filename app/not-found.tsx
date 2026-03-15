import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="container-shell rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="mt-6 inline-flex">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
