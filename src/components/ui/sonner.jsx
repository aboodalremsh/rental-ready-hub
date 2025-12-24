import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = React.forwardRef(function Toaster({ ...props }, ref) {
  // Our app theme is managed by a local ThemeProvider that toggles the html class.
  // Sonner can follow it via the className prop (no hook needed).
  return (
    <Sonner
      ref={ref}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
});

export { Toaster, toast };
