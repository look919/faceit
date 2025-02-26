"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
type NavLinkProps = LinkProps & {
  name: string;
  className?: string;
};

export const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
    <li>
      <Link
        {...props}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm text-white font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-slate-500 data-[state=active]:text-white data-[state=active]:shadow",
          props.className
        )}
      >
        {props.name}
      </Link>
    </li>
  );
};
