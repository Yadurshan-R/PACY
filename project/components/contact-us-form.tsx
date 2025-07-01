"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ContactUsForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cancelMousePosition, setCancelMousePosition] = useState({ x: 0, y: 0 })
  const [isCancelHovering, setIsCancelHovering] = useState(false)
  const [emailMousePosition, setEmailMousePosition] = useState({ x: 0, y: 0 })
  const [isEmailHovering, setIsEmailHovering] = useState(false)
  const [messageMousePosition, setMessageMousePosition] = useState({ x: 0, y: 0 })
  const [isMessageHovering, setIsMessageHovering] = useState(false)
  const [emailErrorMousePosition, setEmailErrorMousePosition] = useState({ x: 0, y: 0 })
  const [isEmailErrorHovering, setIsEmailErrorHovering] = useState(false)
  const [messageErrorMousePosition, setMessageErrorMousePosition] = useState({ x: 0, y: 0 })
  const [isMessageErrorHovering, setIsMessageErrorHovering] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const emailErrorRef = useRef<HTMLParagraphElement>(null)
  const messageErrorRef = useRef<HTMLParagraphElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent, setter: (pos: { x: number; y: number }) => void, ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setter({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    },
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    const cancelButton = cancelRef.current
    const emailInput = emailRef.current
    const messageTextarea = messageRef.current
    const emailError = emailErrorRef.current
    const messageError = messageErrorRef.current

    const handlers = {
      container: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMousePosition, containerRef),
        mouseenter: () => setIsHovering(true),
        mouseleave: () => setIsHovering(false),
      },
      cancel: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setCancelMousePosition, cancelRef),
        mouseenter: () => setIsCancelHovering(true),
        mouseleave: () => setIsCancelHovering(false),
      },
      email: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setEmailMousePosition, emailRef),
        mouseenter: () => setIsEmailHovering(true),
        mouseleave: () => setIsEmailHovering(false),
      },
      message: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMessageMousePosition, messageRef),
        mouseenter: () => setIsMessageHovering(true),
        mouseleave: () => setIsMessageHovering(false),
      },
      emailError: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setEmailErrorMousePosition, emailErrorRef),
        mouseenter: () => setIsEmailErrorHovering(true),
        mouseleave: () => setIsEmailErrorHovering(false),
      },
      messageError: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMessageErrorMousePosition, messageErrorRef),
        mouseenter: () => setIsMessageErrorHovering(true),
        mouseleave: () => setIsMessageErrorHovering(false),
      },
    }

    // Add event listeners
    const elements = [
      { element: container, handlers: handlers.container },
      { element: cancelButton, handlers: handlers.cancel },
      { element: emailInput, handlers: handlers.email },
      { element: messageTextarea, handlers: handlers.message },
      { element: emailError, handlers: handlers.emailError },
      { element: messageError, handlers: handlers.messageError },
    ]

    elements.forEach(({ element, handlers }) => {
      if (element) {
        Object.entries(handlers).forEach(([event, handler]) => {
          element.addEventListener(event, handler as EventListener)
        })
      }
    })

    // Cleanup function
    return () => {
      elements.forEach(({ element, handlers }) => {
        if (element) {
          Object.entries(handlers).forEach(([event, handler]) => {
            element.removeEventListener(event, handler as EventListener)
          })
        }
      })
    }
  }, [handleMouseMove])

  const validateForm = (formData: FormData) => {
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const newErrors: { email?: string; message?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Message sent successfully")
      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getGlassStyle = (mousePos: { x: number; y: number }, isVisible: boolean) => {
    if (!isVisible) return {}

    return {
      background: `
        radial-gradient(ellipse 100px 60px at ${mousePos.x}px ${mousePos.y}px, 
          rgba(255,255,255,0.18) 0%, 
          rgba(255,255,255,0.08) 30%, 
          rgba(255,255,255,0.04) 50%,
          transparent 70%),
        radial-gradient(ellipse 50px 30px at ${mousePos.x - 15}px ${mousePos.y - 10}px, 
          rgba(255,255,255,0.22) 0%, 
          rgba(255,255,255,0.1) 40%, 
          transparent 70%)
      `,
      mask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
      maskComposite: "xor" as const,
      WebkitMask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
      WebkitMaskComposite: "xor" as const,
      padding: "1px",
      filter: "blur(0.8px) contrast(1.1)",
    }
  }

  const getRedGlassStyle = (mousePos: { x: number; y: number }, isVisible: boolean) => {
    if (!isVisible) return {}

    return {
      background: `
        radial-gradient(ellipse 60px 40px at ${mousePos.x}px ${mousePos.y}px, 
          rgba(239,68,68,0.15) 0%, 
          rgba(239,68,68,0.08) 30%, 
          rgba(239,68,68,0.04) 50%,
          transparent 70%),
        radial-gradient(ellipse 30px 20px at ${mousePos.x - 10}px ${mousePos.y - 8}px, 
          rgba(239,68,68,0.18) 0%, 
          rgba(239,68,68,0.1) 40%, 
          transparent 70%)
      `,
      mask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
      maskComposite: "xor" as const,
      WebkitMask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
      WebkitMaskComposite: "xor" as const,
      padding: "1px",
      filter: "blur(0.6px) contrast(1.1)",
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
        }
        
        @keyframes subtlePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 1; 
          }
        }
      `}</style>

      <div className={cn("flex flex-col gap-6 sm:gap-8 w-full max-w-sm mx-auto", className)} {...props}>
        <div className="text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative"
            style={{
              animation: "textGlow 6s ease-in-out infinite",
            }}
          >
            Contact us for your Certara
            <span
              className="inline-block w-1 h-1 bg-white rounded-full mx-1"
              style={{
                animation: "subtlePulse 4s ease-in-out infinite",
              }}
            />
            account
          </h1>
        </div>

        <div
          ref={containerRef}
          className="relative rounded-xl p-6 sm:p-8 overflow-visible border border-white/20 transition-all duration-300 backdrop-blur-sm"
        >
          {isHovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
              style={getGlassStyle(mousePosition, isHovering)}
            />
          )}

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "bg-transparent border transition-all duration-300 rounded-lg text-white placeholder:text-white/50 h-12 px-4 focus:ring-2 focus:ring-white/20 focus:ring-offset-0",
                      errors.email
                        ? "border-red-400/60 focus:border-red-400/80"
                        : "border-white/20 focus:border-white/40",
                    )}
                  />
                  {isEmailHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                      style={getGlassStyle(emailMousePosition, isEmailHovering)}
                    />
                  )}
                </div>
                {errors.email && (
                  <div className="relative">
                    <p
                      ref={emailErrorRef}
                      id="email-error"
                      className="relative text-red-400 text-xs mt-1 p-2 rounded-lg bg-red-500/10 border border-red-400/20 backdrop-blur-sm overflow-hidden"
                      role="alert"
                    >
                      {isEmailErrorHovering && (
                        <div
                          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                          style={getRedGlassStyle(emailErrorMousePosition, isEmailErrorHovering)}
                        />
                      )}
                      <span className="relative z-10">{errors.email}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="message" className="text-white text-sm font-medium">
                  How can we help?
                </Label>
                <div className="relative">
                  <Textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    placeholder="Tell us what you need help with..."
                    required
                    rows={4}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      "bg-transparent border transition-all duration-300 rounded-lg text-white placeholder:text-white/50 p-4 focus:ring-2 focus:ring-white/20 focus:ring-offset-0 resize-none",
                      errors.message
                        ? "border-red-400/60 focus:border-red-400/80"
                        : "border-white/20 focus:border-white/40",
                    )}
                  />
                  {isMessageHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                      style={getGlassStyle(messageMousePosition, isMessageHovering)}
                    />
                  )}
                </div>
                {errors.message && (
                  <div className="relative">
                    <p
                      ref={messageErrorRef}
                      id="message-error"
                      className="relative text-red-400 text-xs mt-1 p-2 rounded-lg bg-red-500/10 border border-red-400/20 backdrop-blur-sm overflow-hidden"
                      role="alert"
                    >
                      {isMessageErrorHovering && (
                        <div
                          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                          style={getRedGlassStyle(messageErrorMousePosition, isMessageErrorHovering)}
                        />
                      )}
                      <span className="relative z-10">{errors.message}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-2">
                <Button
                  ref={cancelRef}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg transition-all duration-300 rounded-lg text-white hover:text-white h-12 focus:ring-2 focus:ring-white/20 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCancelHovering && !isLoading && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                      style={getGlassStyle(cancelMousePosition, isCancelHovering)}
                    />
                  )}
                  <span className="relative z-10">Cancel</span>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-lg h-12 font-medium focus:ring-2 focus:ring-white/20 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              <span className="text-white/70">Already have an account? </span>
              <a
                href="/sign-in"
                className="underline underline-offset-4 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-0 rounded"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>

        <div className="text-center text-xs text-white/40 space-y-2">
          <p>© 2025 Certara. All rights reserved.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="hover:text-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-0 rounded"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hover:text-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-0 rounded"
            >
              Terms of Service
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="/sign-in"
              className="hover:text-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-0 rounded"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
