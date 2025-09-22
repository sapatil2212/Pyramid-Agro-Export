"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsGrid } from "@/components/dashboard/stats-cards";
import { LineChart, BarChart, PieChart, RecentActivity } from "@/components/dashboard/charts";
import { useAppSelector } from "@/lib/hooks";
import { useAuthSync } from "@/hooks/useAuthSync";

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
            <p className="text-gray-600">Here&apos;s what&apos;s happening with your business today.</p>
            <div className="mt-2 text-sm text-gray-500">
              Role: {user?.role || session?.user?.role || 'USER'} | Email: {user?.email || session?.user?.email}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-12">
            <StatsGrid />
          </div>

          {/* Charts Section */}
          <div className="mb-10">
            <div className="mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Analytics Overview</h2>
              <p className="text-gray-600 text-sm">Track your business performance and key metrics</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Revenue Trend - Full width on large screens */}
              <div className="xl:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
                  <LineChart />
                </div>
              </div>
              
              {/* Top Products and Sales Distribution */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
                  <BarChart />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>

          {/* Activity and Actions Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Activity - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
                <RecentActivity />
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Quick Actions</h3>
                <p className="text-gray-600 text-sm">Common tasks and shortcuts</p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-semibold text-sm">New Order</span>
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group">
                  <svg className="h-4 w-4 mr-2 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="font-semibold text-sm">Add Product</span>
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group">
                  <svg className="h-4 w-4 mr-2 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="font-semibold text-sm">Add Customer</span>
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group">
                  <svg className="h-4 w-4 mr-2 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold text-sm">Generate Report</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-red-200 text-red-700 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:border-red-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <svg className="h-4 w-4 mr-2 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-semibold text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
