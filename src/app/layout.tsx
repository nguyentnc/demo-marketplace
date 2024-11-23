import type { Metadata } from "next";
import AppProviders from "./app-providers";
import "./globals.css";

import RootLayoutCtn from "@/layouts/RootLayout";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Demo Marketplace",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayoutCtn>
      <AppProviders>{children}</AppProviders>
    </RootLayoutCtn>
  );
}
