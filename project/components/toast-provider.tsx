"use client"

import type React from "react"
import { createContext, useContext, useCallback, useState, useRef, useEffect } from "react"
import { X, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastData {
  id: string
  type: "success" | "error" | "info"
  heading: string
  subtext: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, "id">) => void
  dismissToast: () => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const toastRef = useRef<HTMLDivElement>(null)

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setCurrentToast(null)
  }, [])

  const showToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      // Clear existing toast and timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      const newToast: ToastData = {
        ...toast,
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }

      setCurrentToast(newToast)

      // Auto-dismiss after duration
      const duration = toast.duration ?? (toast.type === "error" ? 6000 : 4000)
      timeoutRef.current = setTimeout(dismissToast, duration)
    },
    [dismissToast],
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getIcon = (type: ToastData["type"]) => {
    const iconProps = {
      className: "h-5 w-5 flex-shrink-0 mt-0.5",
      "aria-hidden": "true" as const,
    }

    switch (type) {
      case "success":
        return <Check {...iconProps} className={cn(iconProps.className, "text-green-400")} />
      case "error":
        return <X {...iconProps} className={cn(iconProps.className, "text-red-400")} />
      case "info":
        return <AlertCircle {...iconProps} className={cn(iconProps.className, "text-blue-400")} />
      default:
        return null
    }
  }

  const getAriaLabel = (type: ToastData["type"]) => {
    switch (type) {
      case "success":
        return "Success notification"
      case "error":
        return "Error notification"
      case "info":
        return "Information notification"
      default:
        return "Notification"
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none" aria-live="polite" aria-atomic="true">
        {currentToast && (
          <div
            ref={toastRef}
            role="alert"
            aria-label={getAriaLabel(currentToast.type)}
            className={cn(
              "pointer-events-auto relative rounded-lg border border-white/20 p-4 shadow-lg",
              "bg-white/10 backdrop-blur-md transition-all duration-300 ease-out",
              "min-w-[300px] max-w-[400px] sm:max-w-[450px]",
              "animate-in slide-in-from-right-full fade-in-0",
            )}
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={dismissToast}
              className={cn(
                "absolute right-2 top-2 rounded-sm p-1 text-white/70 transition-colors",
                "hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20",
                "focus:ring-offset-2 focus:ring-offset-transparent",
              )}
              aria-label="Close notification"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Toast Content */}
            <div className="flex items-start gap-3 pr-8">
              {getIcon(currentToast.type)}

              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-semibold text-white leading-tight" id={`${currentToast.id}-heading`}>
                  {currentToast.heading}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed" id={`${currentToast.id}-description`}>
                  {currentToast.subtext}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in {
          animation: animate-in 0.3s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-in {
            animation: none;
            opacity: 1;
            transform: translateX(0);
          }
          
        }

        @media (max-width: 640px) {
          .fixed.bottom-4.right-4 {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
          }
          
          .min-w-\\[300px\\] {
            min-width: auto;
          }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
