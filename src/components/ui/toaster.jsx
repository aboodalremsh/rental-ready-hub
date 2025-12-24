import { Toaster as SonnerToaster } from "@/components/ui/sonner";

/**
 * Compatibility wrapper.
 *
 * Some parts of the codebase (or older builds) may still render the shadcn/ui <Toaster />.
 * We map it to Sonner to avoid the hook-based toast store that can cause runtime crashes.
 */
export function Toaster(props) {
  return <SonnerToaster {...props} />;
}

