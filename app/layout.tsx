import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const headingFont = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "AegisCare",
    template: "%s | AegisCare",
  },
  description:
    "A healthcare SaaS dashboard built for secure patient operations, analytics, and care coordination.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    className={cn(
      "font-sans antialiased",
      sansFont.variable,
      headingFont.variable,
      monoFont.variable
    )}
    lang="en"
    suppressHydrationWarning
  >
    <body className="bg-background text-foreground">
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;
