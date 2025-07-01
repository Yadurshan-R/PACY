"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/toast-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
        <Toaster
          position="bottom-right"
          visibleToasts={1}
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              borderRadius: "8px",
              padding: "16px",
              minWidth: "300px",
            },
            className: "glass-toast",
          }}
        />
        <style jsx global>{`
          .glass-toast {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            border-radius: 8px !important;
            padding: 16px !important;
            min-width: 300px !important;
          }
          
          .glass-toast[data-type="error"] {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            backdrop-filter: blur(12px) !important;
            color: white !important;
          }
          
          .glass-toast[data-type="success"] {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            backdrop-filter: blur(12px) !important;
            color: white !important;
          }

          .toast-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }

          .toast-text {
            flex: 1;
          }

          .toast-heading {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
            line-height: 1.2;
          }

          .toast-subtext {
            font-size: 12px;
            opacity: 0.8;
            line-height: 1.3;
          }
        `}</style>
      </body>
    </html>
  )
}
