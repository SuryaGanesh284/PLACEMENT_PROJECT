import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

export function Pagination({ className = "", ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={"mx-auto flex w-full justify-center " + className}
      {...props}
    />
  );
}

export function PaginationContent({ className = "", ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={"flex flex-row items-center gap-1 " + className}
      {...props}
    />
  );
}

export function PaginationItem(props) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationLink({
  className = "",
  isActive,
  size = "icon",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "hover:bg-accent hover:text-accent-foreground";

  const variantClasses = isActive
    ? "border border-input bg-accent text-accent-foreground"
    : "bg-transparent text-foreground";

  const sizeClasses =
    size === "default"
      ? "h-9 px-4 py-2"
      : size === "icon"
      ? "h-9 w-9"
      : "h-8 px-3 py-1";

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
}

export function PaginationPrevious({ className = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={"gap-1 px-2.5 sm:pl-2.5 " + className}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={"gap-1 px-2.5 sm:pr-2.5 " + className}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className = "", ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={"flex size-9 items-center justify-center " + className}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
