import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/layout/Logo";
import { Nav } from "@/components/layout/Nav";
import { NavLink } from "@/components/layout/NavLink";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tomeczki",
  description: "Gracze Ji, ale nie tylko, bo jest też np. Michał",
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
        <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen gap-16 pb-4 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <Logo />
            <Nav>
              <NavLink href="/" name="General" />
              <NavLink href="/session" name="Session" />
            </Nav>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
