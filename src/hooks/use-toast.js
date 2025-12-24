// Toast API compatibility layer.
//
// The previous shadcn/ui toast implementation relied on a React hook-based store.
// In this project it has been triggering "Invalid hook call" at runtime, causing a blank screen.
//
// We keep the same external API (useToast() + toast({...})) but delegate rendering to Sonner,
// which doesn't require a React hook-based global store.

import { toast as sonnerToast } from "@/components/ui/sonner";

/**
 * Backwards-compatible toast function.
 * Supports the shadcn-style signature: toast({ title, description, variant }).
 */
function toast(input) {
  // Allow simple usage: toast("Hello")
  if (typeof input === "string") {
    return sonnerToast(input);
  }

  const title = input?.title;
  const description = input?.description;
  const variant = input?.variant;

  // Sonner needs a "message" (first argument). If no title provided, use description as message.
  const message = title ?? description ?? "";
  const sonnerDescription = title ? description : undefined;

  if (variant === "destructive") {
    return sonnerToast.error(message || "Error", { description: sonnerDescription });
  }

  return sonnerToast(message || "", { description: sonnerDescription });
}

/**
 * Backwards-compatible hook.
 * NOTE: This intentionally does NOT use React hooks.
 */
function useToast() {
  return {
    toasts: [],
    toast,
    dismiss: (toastId) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };

