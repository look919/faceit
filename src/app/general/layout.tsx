import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { NavLink } from "@/components/layout/NavLink";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Tomeczki - General",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center w-fit">
      <PageHeader name="Season 3 stats" />
      <Nav>
        <NavLink tier="sub" href="/general/main" name="Main" />
        <NavLink tier="sub" href="/general/weapons" name="Weapons" />
        <NavLink tier="sub" href="/general/advanced" name="Advanced" />
        <NavLink tier="sub" href="/general/maps" name="Maps" />
      </Nav>
      {children}
    </section>
  );
}
