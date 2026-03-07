import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PerkOS - Infrastructure for the Agentic Economy",
  description: "Deploy, manage, and scale AI agents across your organization with built-in micropayments, on-chain identity, and fleet orchestration. The infrastructure for the agentic economy.",
  keywords: ["AI agents", "agentic economy", "Web3", "x402", "ERC-8004", "agent infrastructure", "micropayments", "fleet orchestration", "AI operations"],
  authors: [{ name: "PerkOS" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL("https://perkos.xyz"),
  alternates: {
    canonical: "https://perkos.xyz",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PerkOS - Infrastructure for the Agentic Economy",
    description: "Deploy, manage, and scale AI agents across your organization. Built-in micropayments, on-chain identity, and fleet orchestration.",
    type: "website",
    url: "https://perkos.xyz",
    siteName: "PerkOS",
    images: [
      {
        url: "/images/PerkOS.png",
        width: 1200,
        height: 630,
        alt: "PerkOS - Infrastructure for the Agentic Economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PerkOS - Infrastructure for the Agentic Economy",
    description: "Deploy, manage, and scale AI agents with built-in payments, identity, and orchestration.",
    creator: "@PerkOS_xyz",
    site: "@PerkOS_xyz",
    images: ["/images/PerkOS.png"],
  },
  other: {
    "talentapp:project_verification": "0f06f10f203f21292eb4936326d8d5007d9956c5d2ea9cab37e1b81a46d4ee01ea1640af6cf29aaea6a10ca9f964f26cb34827197722a117423f388444ac0827",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
