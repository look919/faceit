import { cn } from "@/lib/utils";

interface NavProps {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const Nav = (props: NavProps) => {
  return (
    <nav aria-label={props.ariaLabel}>
      <ul
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-slate-700 p-1 text-muted-foreground",
          props.className
        )}
      >
        {props.children}
      </ul>
    </nav>
  );
};
