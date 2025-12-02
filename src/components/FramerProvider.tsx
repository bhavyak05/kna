"use client";

import { useFramerReady } from "@/lib/useFramerReady";

export default function FramerProvider({ children }: { children: React.ReactNode }) {
  const ready = useFramerReady();

  // Prevent Framer Motion layout animations until hydration is complete
  return <>{children}</>;
}
