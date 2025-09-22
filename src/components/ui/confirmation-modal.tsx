"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = 'warning',
  loading = false
}: ConfirmationModalProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 200)
  }

  const handleConfirm = () => {
    onConfirm()
    handleClose()
  }

  if (!isOpen) return null

  const getIconAndColors = () => {
    switch (type) {
      case 'danger':
        return {
          icon: AlertTriangle,
          iconColor: 'text-red-500',
          iconBg: 'bg-red-100',
          confirmBg: 'bg-red-600 hover:bg-red-700',
          confirmText: 'text-white'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-orange-500',
          iconBg: 'bg-orange-100',
          confirmBg: 'bg-orange-600 hover:bg-orange-700',
          confirmText: 'text-white'
        }
      case 'info':
        return {
          icon: AlertTriangle,
          iconColor: 'text-blue-500',
          iconBg: 'bg-blue-100',
          confirmBg: 'bg-blue-600 hover:bg-blue-700',
          confirmText: 'text-white'
        }
      default:
        return {
          icon: AlertTriangle,
          iconColor: 'text-orange-500',
          iconBg: 'bg-orange-100',
          confirmBg: 'bg-orange-600 hover:bg-orange-700',
          confirmText: 'text-white'
        }
    }
  }

  const { icon: Icon, iconColor, iconBg, confirmBg, confirmText: confirmTextColor } = getIconAndColors()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-2xl p-6 mx-4 max-w-sm w-full transform transition-all duration-200 ${
        show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={loading}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-6">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 px-4 py-2 text-sm font-medium ${confirmTextColor} ${confirmBg} rounded-lg transition-colors disabled:opacity-50`}
            >
              {loading ? 'Processing...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
