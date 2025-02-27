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
  description: "Gracze Ji - SEZON 2!",
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
        <div className="grid grid-rows-[20px_1fr_20px] px-8 min-h-screen gap-x-16 pb-4 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8">
            <Logo />
            <Nav ariaLabel="primary navigation">
              <NavLink tier="main" href="/general/main" name="General" />
              <NavLink tier="main" href="/session/main" name="Session" />
            </Nav>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
