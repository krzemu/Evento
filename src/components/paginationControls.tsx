import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

type PaginationLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function PaginationControls({ previousPath, nextPath }: PaginationControlsProps) {
  return (
    <section className="w-full flex justify-between px-[20px]">
      {!!previousPath && (
        <PaginationLink href={previousPath} className="mr-auto">
          <ArrowLeftIcon />
          Previus
        </PaginationLink>
      )}
      {!!nextPath && (
        <PaginationLink href={nextPath} className="ml-auto">
          Next
          <ArrowRightIcon />
        </PaginationLink>
      )}
    </section>
  );
}

function PaginationLink({ children, href, className }: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        `text-white px-5 py-3 bg-white/5 flex items-center rounded-sm opacity-75 gap-x-2 hover:opacity-100 transition text-sm`,
        className
      )}>
      {children}
    </Link>
  );
}
