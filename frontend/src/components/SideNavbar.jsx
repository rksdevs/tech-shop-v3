import { Link, useLocation } from "react-router-dom";
// import { usePathname } from "next/navigation";

import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";

export function SidebarNav({
  className,
  items,
  section,
  setSection,
  ...props
}) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-0 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.section}
          variant="ghost"
          className={cn(
            item.section === section
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
            "text-xs lg:text-sm p-3 lg:p-4"
          )}
          onClick={() => setSection(item.section)}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
