import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider";
import MeshProviderWrapper from '@/components/MeshProviderWrapper';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Certara Login",
  description: "Login to your Certara account",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <MeshProviderWrapper>
            {children}
          </MeshProviderWrapper>
        </ThemeProvider>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </body>
    </html>
  )
}
