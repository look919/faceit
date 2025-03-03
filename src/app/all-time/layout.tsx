import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { NavLink } from "@/components/layout/NavLink";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Tomeczki - All-time",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center w-fit">
      <PageHeader name="All-time stats" />
      <Nav>
        <NavLink tier="sub" href="/all-time/main" name="Main" />
        <NavLink tier="sub" href="/all-time/weapons" name="Weapons" />
        <NavLink tier="sub" href="/all-time/advanced" name="Advanced" />
        <NavLink tier="sub" href="/all-time/maps" name="Maps" />
      </Nav>
      {children}
    </section>
  );
}
