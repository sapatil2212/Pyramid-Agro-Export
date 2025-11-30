"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { useAppSelector } from "@/lib/hooks";
import { useAuthSync } from "@/hooks/useAuthSync";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Sync auth with Redux
  useAuthSync();
  
  // Get user data from Redux
  const user = useAppSelector((state) => state.user.user);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth");
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} title="Dashboard" />
        
        {/* Main content area */}
        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || session?.user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">Here&apos;s your website analytics and visitor insights.</p>
            <div className="mt-2 text-sm text-gray-500">
              Role: {user?.role || session?.user?.role || 'USER'} | Email: {user?.email || session?.user?.email}
            </div>
          </div>

          {/* Analytics Dashboard */}
          <AnalyticsDashboard />
        </main>
      </div>
    </>
  );
}
