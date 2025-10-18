import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MobileCheck from "@/components/MobileCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberFlow - Mobile Streaming",
  description: "Mobile-only streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MobileCheck>
            {children}
          </MobileCheck>
        </Providers>
      </body>
    </html>
  );
}
