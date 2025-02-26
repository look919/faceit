import { cn } from "@/lib/utils";

interface NavProps {
  children: React.ReactNode;
  className?: string;
}

export const Nav = (props: NavProps) => {
  return (
    <nav>
      <ul
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg bg-slate-700 p-1 text-muted-foreground",
          props.className
        )}
      >
        {props.children}
      </ul>
    </nav>
  );
};
