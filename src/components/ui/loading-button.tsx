"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowRight } from "lucide-react"

interface LoadingButtonProps {
  onClick?: () => void | Promise<void>
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showArrow?: boolean
  loadingText?: string
}

export function LoadingButton({
  onClick,
  children,
  variant = "default",
  size = "default",
  className = "",
  showArrow = false,
  loadingText = "Loading..."
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (onClick && !isLoading) {
      setIsLoading(true)
      try {
        await onClick()
      } finally {
        // Add a realistic delay to show the loading state
        setTimeout(() => {
          setIsLoading(false)
        }, 1500) // Increased delay to 1.5 seconds
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
        </>
      )}
    </Button>
  )
}
