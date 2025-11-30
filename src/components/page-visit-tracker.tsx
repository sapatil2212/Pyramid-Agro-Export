"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Generate a unique visitor ID and store in localStorage
function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
}

// Generate a session ID (resets after 30 minutes of inactivity)
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const stored = localStorage.getItem("session_data");
  const now = Date.now();
  
  if (stored) {
    try {
      const { id, lastActivity } = JSON.parse(stored);
      if (now - lastActivity < SESSION_TIMEOUT) {
        localStorage.setItem("session_data", JSON.stringify({ id, lastActivity: now }));
        return id;
      }
    } catch {
      // Invalid stored data, create new session
    }
  }
  
  const sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  localStorage.setItem("session_data", JSON.stringify({ id: sessionId, lastActivity: now }));
  return sessionId;
}

export function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track dashboard pages
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/auth") || pathname?.startsWith("/api")) {
      return;
    }

    const trackVisit = async () => {
      try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();
        
        await fetch("/api/page-visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            visitorId,
            sessionId,
            referrer: document.referrer || null
          })
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error("Failed to track page visit:", error);
      }
    };

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(trackVisit, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
}
