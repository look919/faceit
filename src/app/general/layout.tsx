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
    <section>
      <PageHeader name="General stats" />
      <Nav>
        <NavLink tier="sub" href="/general/main" name="Main" />
        <NavLink tier="sub" href="/general/weapons" name="Weapons" />
      </Nav>
      {children}
    </section>
  );
}
