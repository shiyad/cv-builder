"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Replace with your own util if needed

type AccordionProps =
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps;

const AccordionRoot = React.forwardRef<
  HTMLDivElement,
  AccordionProps & { className?: string }
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={className} {...props}>
    {children}
  </AccordionPrimitive.Root>
));
AccordionRoot.displayName = "AccordionRoot";

const AccordionItem = ({
  children,
  value,
  className,
  ...props
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => (
  <AccordionPrimitive.Item
    value={value}
    className={cn("border-b", className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Item>
);

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("pb-4 pt-1 text-sm transition-all", className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

// Export all as a grouped object
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
