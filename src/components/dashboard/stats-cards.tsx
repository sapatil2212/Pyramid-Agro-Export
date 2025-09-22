"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
  color: "emerald" | "blue" | "amber" | "red";
}

const colorClasses = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
};

export function StatCard({ title, value, change, changeType, icon, color }: StatCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 hover:scale-[1.02] transition-all duration-300 transform group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{value}</p>
          <div className="flex items-center">
            <span
              className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                changeType === "positive" && "text-emerald-700 bg-emerald-100",
                changeType === "negative" && "text-red-700 bg-red-100",
                changeType === "neutral" && "text-gray-700 bg-gray-100"
              )}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500 ml-2 font-medium">vs last month</span>
          </div>
        </div>
        <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300", colorClasses[color])}>
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function StatsGrid() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      color: "emerald" as const,
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "blue" as const,
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
      color: "amber" as const,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      color: "red" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
