"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";

type AuthMode = "login" | "signup";

function AuthContent() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get("mode");
    
    if (mode === "login" || mode === "signup") {
      setAuthMode(mode);
    }
  }, [searchParams]);

  const handleCancel = () => {
    // Navigate back to home page or previous page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">

        {/* Auth Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 border border-gray-200">
            <div className="flex">
              <Button
                variant={authMode === "login" ? "default" : "ghost"}
                onClick={() => setAuthMode("login")}
                className={`px-6 py-2 text-sm rounded-md transition-all duration-200 ${
                  authMode === "login" 
                    ? "bg-emerald-600 text-white" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Sign In
              </Button>
              <Button
                variant={authMode === "signup" ? "default" : "ghost"}
                onClick={() => setAuthMode("signup")}
                className={`px-6 py-2 text-sm rounded-md transition-all duration-200 ${
                  authMode === "signup" 
                    ? "bg-emerald-600 text-white" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex justify-center">
          {authMode === "login" ? (
            <LoginForm onCancel={handleCancel} />
          ) : (
            <SignupForm onCancel={handleCancel} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>
            By creating an account or signing in, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
