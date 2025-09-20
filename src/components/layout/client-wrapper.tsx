"use client"

import { useState } from "react"
import { Header } from "./header"
import { AppointmentModalProvider } from "../appointment-modal-provider"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  const handleAppointmentClick = () => {
    setIsAppointmentOpen(true)
  }

  return (
    <AppointmentModalProvider>
      <Header onAppointmentClick={handleAppointmentClick} />
      {children}
    </AppointmentModalProvider>
  )
}
