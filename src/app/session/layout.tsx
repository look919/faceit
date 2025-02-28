import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { NavLink } from "@/components/layout/NavLink";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Tomeczki - Session",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center">
      <PageHeader name="Session stats" />
      <Nav>
        <NavLink tier="sub" href="/session/main" name="Main" />
        <NavLink tier="sub" href="/session/weapons" name="Weapons" />
        <NavLink tier="sub" href="/session/advanced" name="Advanced" />
      </Nav>
      {children}
    </section>
  );
}
