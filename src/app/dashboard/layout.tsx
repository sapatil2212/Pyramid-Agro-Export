import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pyramid Agro Export",
  description: "Pyramid Agro Export Dashboard - Manage your agricultural export business",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {children}
    </div>
  );
}
