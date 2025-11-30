"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  visitsChange: string;
  visitorsChange: string;
  visitsByPage: { page: string; count: number }[];
  visitsByDevice: { device: string; count: number }[];
  visitsByBrowser: { browser: string; count: number }[];
  visitsByCountry: { country: string; count: number }[];
  dailyVisits: { date: string; count: number }[];
  period: string;
}

interface RealtimeData {
  activeVisitors: number;
  recentPageViews: number;
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [realtime, setRealtime] = useState<RealtimeData>({ activeVisitors: 0, recentPageViews: 0 });
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  const [loading, setLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/page-visits?period=${period}&type=summary`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [period]);

  // Fetch realtime data every 10 seconds
  useEffect(() => {
    const fetchRealtime = async () => {
      try {
        const response = await fetch("/api/page-visits?type=realtime");
        if (response.ok) {
          const data = await response.json();
          setRealtime(data);
        }
      } catch (error) {
        console.error("Failed to fetch realtime data:", error);
      }
    };
    fetchRealtime();
    const interval = setInterval(fetchRealtime, 10000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon, color, isRealtime = false }: {
    title: string; value: string | number; change?: string; icon: string; color: string; isRealtime?: boolean;
  }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
            {isRealtime && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                LIVE
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                change.startsWith("+") ? "text-emerald-700 bg-emerald-100" : change.startsWith("-") ? "text-red-700 bg-red-100" : "text-gray-700 bg-gray-100"
              }`}>
                {change}
              </span>
              <span className="text-xs text-gray-500 ml-2">vs previous</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${color}`}>
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex items-center gap-2">
        {(["today", "week", "month"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              period === p ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p === "today" ? "Today" : p === "week" ? "This Week" : "This Month"}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Visitors"
          value={realtime.activeVisitors}
          icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          color="bg-green-50 text-green-600"
          isRealtime
        />
        <StatCard
          title="Total Page Views"
          value={analytics?.totalVisits.toLocaleString() || "0"}
          change={analytics?.visitsChange}
          icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Unique Visitors"
          value={analytics?.uniqueVisitors.toLocaleString() || "0"}
          change={analytics?.visitorsChange}
          icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Recent Views (5min)"
          value={realtime.recentPageViews}
          icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          color="bg-purple-50 text-purple-600"
          isRealtime
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {analytics?.visitsByPage.length ? (
              analytics.visitsByPage.slice(0, 5).map((page, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 truncate max-w-[200px]">{page.page || "/"}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{page.count.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No page data available</p>
            )}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {analytics?.visitsByDevice.length ? (
              analytics.visitsByDevice.map((device, i) => {
                const total = analytics.visitsByDevice.reduce((sum, d) => sum + d.count, 0);
                const percentage = total > 0 ? Math.round((device.count / total) * 100) : 0;
                const colors = ["bg-emerald-500", "bg-blue-500", "bg-amber-500"];
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 capitalize">{device.device || "Unknown"}</span>
                      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${colors[i % 3]} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No device data available</p>
            )}
          </div>
        </div>

        {/* Browser Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browser Stats</h3>
          <div className="space-y-3">
            {analytics?.visitsByBrowser.length ? (
              analytics.visitsByBrowser.slice(0, 5).map((browser, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{browser.browser || "Unknown"}</span>
                  <span className="text-sm font-semibold text-gray-900">{browser.count.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No browser data available</p>
            )}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Countries</h3>
          <div className="space-y-3">
            {analytics?.visitsByCountry.length ? (
              analytics.visitsByCountry.slice(0, 5).map((country, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{country.country || "Unknown"}</span>
                  <span className="text-sm font-semibold text-gray-900">{country.count.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No country data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
