"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
    children?: React.ReactNode;
  }
>(({ className, value, onValueChange, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background cursor-pointer hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return child.props.value === value ? child.props.children : null;
            }
            return null;
          }) || "选择..."}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>
      
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/20 bg-slate-900/95 backdrop-blur-md shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {React.Children.map(children, child =>
              React.isValidElement(child) && child.type === SelectItem
                ? React.cloneElement(child as any, {
                    onSelect: () => {
                      onValueChange?.(child.props.value);
                      setOpen(false);
                    },
                    isSelected: value === child.props.value,
                  })
                : null
            )}
          </div>
        </div>
      )}
    </div>
  );
});
Select.displayName = "Select";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    children: React.ReactNode;
    isSelected?: boolean;
    onSelect?: () => void;
  }
>(({ className, value, children, isSelected, onSelect }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm outline-none hover:bg-white/10 focus:bg-white/10",
        isSelected && "bg-purple-600/30 text-purple-300",
        className
      )}
      onClick={onSelect}
    >
      <span className="flex-1">{children}</span>
      {isSelected && <Check className="h-4 w-4" />}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const SelectTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={className} {...props} />
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />
);
SelectContent.displayName = "SelectContent";

export { Select, SelectItem, SelectTrigger, SelectValue, SelectContent };
