"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/auth');

  // Hide footer on dashboard and auth routes
  if (isDashboardRoute || isAuthRoute) {
    return null;
  }

  return <Footer />;
}
