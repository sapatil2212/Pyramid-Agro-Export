"use client"

import { Header } from "./header"
import { AppointmentModalProvider } from "../appointment-modal-provider"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const handleAppointmentClick = () => {
    // Appointment modal will be handled by the provider
  }

  return (
    <AppointmentModalProvider>
      <Header onAppointmentClick={handleAppointmentClick} />
      {children}
    </AppointmentModalProvider>
  )
}
