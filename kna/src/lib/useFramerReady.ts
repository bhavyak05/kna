"use client";

import { useEffect, useState } from "react";

export function useFramerReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Ensure full hydration before framer animations
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, []);

  return ready;
}
