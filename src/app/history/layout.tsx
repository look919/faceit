import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { NavLink } from "@/components/layout/NavLink";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Tomeczki - History",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center w-fit">
      <PageHeader name="History" />
      <Nav>
        <NavLink tier="sub" href="/history/season1" name="Season 1" />
      </Nav>
      {children}
    </section>
  );
}
