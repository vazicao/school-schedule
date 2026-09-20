"use client";

import { useEffect } from "react";

// Registers /sw.js so the app opens fast and works offline. Production only:
// in dev, a service worker would cache stale code and cause confusing bugs.
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // Best effort — the app works fine without it.
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return null;
}
