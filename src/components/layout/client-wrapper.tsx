"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { AppointmentModalProvider } from "../appointment-modal-provider"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAuthRoute = pathname.startsWith('/auth')
  
  const handleAppointmentClick = () => {
    // Appointment modal will be handled by the provider
  }

  return (
    <AppointmentModalProvider>
      {!isDashboardRoute && !isAuthRoute && <Header onAppointmentClick={handleAppointmentClick} />}
      {children}
    </AppointmentModalProvider>
  )
}
