"use client";

import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface Props {
  items: {
    label: string;
    path: string;
  }[];
  className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ items, className }) => {
  return (
    <Breadcrumb className={cn("hidden md:flex", className)}>
      <BreadcrumbList>
        {items.map(({ label, path }, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={path}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
