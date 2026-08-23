"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the waitlist_confirmed analytics event once when the confirm page mounts. */
export function ConfirmTracker() {
  useEffect(() => {
    track("waitlist_confirmed");
  }, []);
  return null;
}
