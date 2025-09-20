"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { PageLoader } from "@/components/ui/loading-spinner"

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loader when pathname changes
    setIsLoading(true)
    
    // Hide loader after a realistic delay to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Increased delay to 1.2 seconds

    return () => clearTimeout(timer)
  }, [pathname])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <PageLoader />}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
