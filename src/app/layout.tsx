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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-visible min-h-screen min-w-screen`}
      >
        <div className="absolute min-h-screen inset-0 bg-[url('/background2.png')] hidden xl:block bg-cover opacity-10 z-0" />
        <div className="relative z-10 flex flex-col w-fit px-4 font-[family-name:var(--font-geist-sans)] mx-auto min-h-screen">
          <main className="flex flex-col items-center gap-8 row-start-2 p-2 mt-8">
            <Logo />
            <Nav ariaLabel="primary navigation">
              <NavLink tier="main" href="/general/main" name="Season 2" />
              <NavLink tier="main" href="/session/main" name="Session" />
              <NavLink tier="main" href="/all-time/main" name="All-time" />
              <NavLink tier="main" href="/history/season2" name="History" />
              <NavLink tier="main" href="/randomize-teams" name="Draw Teams" />
            </Nav>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
