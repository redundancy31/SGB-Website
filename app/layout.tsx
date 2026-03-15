import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { company } from "@/data/company";
import { companyProfile } from "@/data/company-profile";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const siteUrl = "https://www.sgbengineering.sg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: companyProfile.seo.homeTitle,
    template: `%s | ${company.name}`
  },
  description: companyProfile.seo.homeDescription,
  openGraph: {
    title: companyProfile.seo.homeTitle,
    description: companyProfile.seo.homeDescription,
    url: siteUrl,
    siteName: company.name,
    type: "website",
    images: [{ url: company.heroImage, width: 1200, height: 630, alt: company.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: companyProfile.seo.homeTitle,
    description: companyProfile.seo.homeDescription,
    images: [company.heroImage]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
