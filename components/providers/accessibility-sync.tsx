"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

export function AccessibilitySync() {
  const isHighContrast = useUiStore((state) => state.isHighContrast);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", isHighContrast);
  }, [isHighContrast]);

  return null;
}
