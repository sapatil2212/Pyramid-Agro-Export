"use client";

import { useState, useEffect } from "react";

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  mapUrl: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const defaultContactInfo: ContactInfo = {
  phone: "+91 91300 70701",
  whatsapp: "+91 91300 70701",
  email: "pyramidagroexports@gmail.com",
  address: "Office, Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra 422003",
  city: "Nashik",
  mapUrl: "https://maps.app.goo.gl/41wjFQCukoUpB9m29?g_st=ipc",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: ""
};

export function ContactSettings() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/site-settings");
        if (response.ok) {
          const settings = await response.json();
          if (Array.isArray(settings)) {
            const contactSetting = settings.find((s: { key: string }) => s.key === "contact_info");
            if (contactSetting) {
              try {
                setContactInfo(JSON.parse(contactSetting.value));
              } catch (e) {
                console.error("Failed to parse contact info:", e);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "contact_info",
          value: JSON.stringify(contactInfo),
          type: "json",
          description: "Contact information for footer and contact page"
        })
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save contact info:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const InputField = ({ label, value, onChange, type = "text", placeholder = "", colSpan = false }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; colSpan?: boolean;
  }) => (
    <div className={colSpan ? "lg:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-700 font-medium">Contact information saved successfully!</span>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h2>
        <p className="text-gray-600 mb-8">Manage contact details displayed on the website footer and contact page.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField label="Phone Number" value={contactInfo.phone} onChange={(v) => setContactInfo({ ...contactInfo, phone: v })} placeholder="+91 91300 70701" />
          <InputField label="WhatsApp Number" value={contactInfo.whatsapp} onChange={(v) => setContactInfo({ ...contactInfo, whatsapp: v })} placeholder="+91 91300 70701" />
          <InputField label="Email Address" value={contactInfo.email} onChange={(v) => setContactInfo({ ...contactInfo, email: v })} type="email" placeholder="info@example.com" />
          <InputField label="City" value={contactInfo.city} onChange={(v) => setContactInfo({ ...contactInfo, city: v })} placeholder="Nashik" />
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <textarea
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
              placeholder="Enter your full address"
            />
          </div>
          
          <InputField label="Google Maps URL" value={contactInfo.mapUrl} onChange={(v) => setContactInfo({ ...contactInfo, mapUrl: v })} type="url" placeholder="https://maps.google.com/..." colSpan />
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media Links</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputField label="Facebook URL" value={contactInfo.facebook} onChange={(v) => setContactInfo({ ...contactInfo, facebook: v })} type="url" placeholder="https://facebook.com/..." />
            <InputField label="Twitter URL" value={contactInfo.twitter} onChange={(v) => setContactInfo({ ...contactInfo, twitter: v })} type="url" placeholder="https://twitter.com/..." />
            <InputField label="LinkedIn URL" value={contactInfo.linkedin} onChange={(v) => setContactInfo({ ...contactInfo, linkedin: v })} type="url" placeholder="https://linkedin.com/..." />
            <InputField label="Instagram URL" value={contactInfo.instagram} onChange={(v) => setContactInfo({ ...contactInfo, instagram: v })} type="url" placeholder="https://instagram.com/..." />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
