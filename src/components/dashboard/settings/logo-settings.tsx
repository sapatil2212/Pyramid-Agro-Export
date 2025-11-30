"use client";

import { useState, useEffect } from "react";

export function LogoSettings() {
  const [navbarLogo, setNavbarLogo] = useState<string>("");
  const [footerLogo, setFooterLogo] = useState<string>("");
  const [footerLogoMobile, setFooterLogoMobile] = useState<string>("");
  const [uploadingNavbar, setUploadingNavbar] = useState(false);
  const [uploadingFooter, setUploadingFooter] = useState(false);
  const [uploadingFooterMobile, setUploadingFooterMobile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/site-settings");
        if (response.ok) {
          const settings = await response.json();
          if (Array.isArray(settings)) {
            settings.forEach((s: { key: string; value: string }) => {
              if (s.key === "navbar_logo") setNavbarLogo(s.value);
              if (s.key === "footer_logo") setFooterLogo(s.value);
              if (s.key === "footer_logo_mobile") setFooterLogoMobile(s.value);
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleLogoUpload = async (file: File, type: "navbar" | "footer" | "footer_mobile") => {
    const setUploading = type === "navbar" ? setUploadingNavbar : type === "footer" ? setUploadingFooter : setUploadingFooterMobile;
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "logos");
      
      const uploadResponse = await fetch("/api/upload-image", { method: "POST", body: formData });
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to upload image");
      }
      
      const { url } = await uploadResponse.json();
      const key = type === "navbar" ? "navbar_logo" : type === "footer" ? "footer_logo" : "footer_logo_mobile";
      
      await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: url, type: "image", description: `${type} logo` })
      });
      
      if (type === "navbar") setNavbarLogo(url);
      else if (type === "footer") setFooterLogo(url);
      else setFooterLogoMobile(url);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to upload logo:", error);
      alert("Failed to upload logo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const LogoUploadCard = ({ title, description, logo, uploading, onUpload, bgColor = "bg-gray-100" }: {
    title: string; description: string; logo: string; uploading: boolean;
    onUpload: (file: File) => void; bgColor?: string;
  }) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
        {logo ? (
          <div className="space-y-4">
            <div className={`${bgColor} rounded-lg p-4 inline-block`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={title} className="h-12 w-auto object-contain" />
            </div>
            <p className="text-xs text-gray-500">Current logo</p>
          </div>
        ) : (
          <div className="py-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No logo uploaded</p>
          </div>
        )}
        <label className="mt-4 inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors">
          {uploading ? (
            <><svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Uploading...</>
          ) : (
            <><svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>{logo ? "Change Logo" : "Upload Logo"}</>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }} disabled={uploading} />
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-emerald-700 font-medium">Logo uploaded successfully!</span>
        </div>
      )}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Logo Settings</h2>
        <p className="text-gray-600 mb-8">Upload and manage your website logos for navbar and footer.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LogoUploadCard title="Navbar Logo" description="Displayed in the main navigation" logo={navbarLogo} uploading={uploadingNavbar} onUpload={(f) => handleLogoUpload(f, "navbar")} />
          <LogoUploadCard title="Footer Logo (Desktop)" description="Displayed in footer on desktop" logo={footerLogo} uploading={uploadingFooter} onUpload={(f) => handleLogoUpload(f, "footer")} bgColor="bg-gray-800" />
          <LogoUploadCard title="Footer Logo (Mobile)" description="Displayed in footer on mobile" logo={footerLogoMobile} uploading={uploadingFooterMobile} onUpload={(f) => handleLogoUpload(f, "footer_mobile")} bgColor="bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
