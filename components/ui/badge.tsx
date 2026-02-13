import * as React from "react";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-purple-600 text-white shadow-sm shadow-purple-500/30",
    secondary: "border-transparent bg-white/10 text-white/80",
    outline: "text-white/70 border-white/20 bg-transparent",
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className || ""}`}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
