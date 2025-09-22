"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AboutContentManager } from "@/components/dashboard/about-content-manager";
import { TeamMembersManager } from "@/components/dashboard/team-members-manager";
import { CertificationsManager } from "@/components/dashboard/certifications-manager";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Award, 
  Eye
} from "lucide-react";

type TabType = 'content' | 'team' | 'certifications';

export default function AboutManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'content' as TabType,
      label: 'Content Management',
      icon: FileText,
      description: 'Manage about page content and sections'
    },
    {
      id: 'team' as TabType,
      label: 'Team Members',
      icon: Users,
      description: 'Manage team members and their information'
    },
    {
      id: 'certifications' as TabType,
      label: 'Certifications',
      icon: Award,
      description: 'Manage certifications and compliance'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return <AboutContentManager />;
      case 'team':
        return <TeamMembersManager />;
      case 'certifications':
        return <CertificationsManager />;
      default:
        return <AboutContentManager />;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} title="About Page Management" />
        
        {/* Main content area */}
        <main className="p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  About Page Management
                </h1>
                <p className="text-gray-600">
                  Manage your about page content, team members, and certifications.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open('/about', '_blank')}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview Page</span>
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg border border-gray-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
