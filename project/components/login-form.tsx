"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

interface MousePosition {
  x: number
  y: number
}

interface ValidationError {
  field: string
  message: string
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cancelMousePosition, setCancelMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isCancelHovering, setIsCancelHovering] = useState(false)
  const [emailMousePosition, setEmailMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isEmailHovering, setIsEmailHovering] = useState(false)
  const [passwordMousePosition, setPasswordMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isPasswordHovering, setIsPasswordHovering] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent, setter: (pos: MousePosition) => void, ref: React.RefObject<HTMLElement>) => {
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
    const elements = {
      container: containerRef.current,
      cancel: cancelRef.current,
      email: emailRef.current,
      password: passwordRef.current,
    }

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
      password: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setPasswordMousePosition, passwordRef),
        mouseenter: () => setIsPasswordHovering(true),
        mouseleave: () => setIsPasswordHovering(false),
      },
    }

    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        const elementHandlers = handlers[key as keyof typeof handlers]
        Object.entries(elementHandlers).forEach(([event, handler]) => {
          element.addEventListener(event, handler as EventListener, { passive: true })
        })
      }
    })

    return () => {
      Object.entries(elements).forEach(([key, element]) => {
        if (element) {
          const elementHandlers = handlers[key as keyof typeof handlers]
          Object.entries(elementHandlers).forEach(([event, handler]) => {
            element.removeEventListener(event, handler as EventListener)
          })
        }
      })
    }
  }, [handleMouseMove])

  const validateForm = useCallback((formData: FormData): ValidationError[] => {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const errors: ValidationError[] = []

    if (!email?.trim()) {
      errors.push({ field: "email", message: "Email address is required" })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: "email", message: "Invalid email address format" })
    }

    if (!password?.trim()) {
      errors.push({ field: "password", message: "Password is required" })
    } else if (password.length < 6) {
      errors.push({ field: "password", message: "Password must be at least 6 characters" })
    }

    return errors
  }, [])

  const showErrorToast = useCallback((errors: ValidationError[]) => {
    const firstError = errors[0]
    const remainingCount = errors.length - 1
    let message = firstError.message

    if (remainingCount > 0) {
      message = `${firstError.message} (${remainingCount} more issue${remainingCount > 1 ? "s" : ""} found)`
    }

    toast.error("Validation Error", {
      description: message,
      duration: 6000,
    })
  }, [])

  const showSuccessToast = useCallback(() => {
    toast.success("Login Successful", {
      description: "Welcome back! You have been authenticated successfully.",
      duration: 4000,
    })
  }, [])

const showAuthErrorToast = useCallback(
  (heading: string, description: string) => {
    toast.error(heading, {
      description,
      duration: 6000,
    });
  },
  []
);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const validationErrors = validateForm(formData)

      if (validationErrors.length > 0) {
        showErrorToast(validationErrors)
        const firstErrorField = validationErrors[0].field
        if (firstErrorField === "email" && emailRef.current) {
          emailRef.current.focus()
        } else if (firstErrorField === "password" && passwordRef.current?.querySelector("input")) {
          ; (passwordRef.current.querySelector("input") as HTMLInputElement).focus()
        }
        return
      }

      setIsLoading(true)
      try {
         const email = formData.get("email") as string
      const password = formData.get("password") as string

      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.isAdmin) {
        showSuccessToast()
        console.log("Login as Admin successful ")
        setTimeout(() => {router.push(data.redirect); }, 500);
      }
      else if(res.ok && data.flag) {
        showSuccessToast()
        console.log("Login successful ")
        setTimeout(() => {router.push("/changePassword"); }, 500);
      }
      else if(res.ok) {
      showSuccessToast()
      console.log("Login successful ")
      router.push("/home");
      }
      else {
        showAuthErrorToast(data.heading, data.message);
        console.error("Login failed:", data.message)
      }
        
      } catch (error) {
       showAuthErrorToast("Internal Server Error", "An unexpected error occurred. Please try again later.");
        console.error("Login failed:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [router, validateForm, showErrorToast, showSuccessToast, showAuthErrorToast],
  )

  const getGlassStyle = useMemo(() => {
    return (mousePos: MousePosition, isVisible: boolean) => {
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
  }, [])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

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
        @keyframes slideUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideUpStaggered {
          0% { 
            opacity: 0; 
            transform: translateY(20px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-fade-in {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stagger-1 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .animate-stagger-2 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .animate-stagger-3 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }
        .animate-stagger-4 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
        .hover-lift:hover {
          transform: translateY(-1px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gentle-bounce {
          animation: gentleBounce 3s ease-in-out infinite;
        }
        .smooth-transition {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Remove all focus outlines */
        .no-outline:focus,
        .no-outline:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        /* Remove browser default focus styles */
        input:focus,
        button:focus,
        a:focus,
        input:focus-visible,
        button:focus-visible,
        a:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-stagger-1,
          .animate-stagger-2,
          .animate-stagger-3,
          .animate-stagger-4,
          .gentle-bounce {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .smooth-transition,
          .hover-lift:hover {
            transition: none;
          }
        }
      `}</style>
      <div className={cn("flex flex-col gap-8 sm:gap-12 w-full max-w-lg mx-auto", className)} {...props}>
        <header className="text-center animate-stagger-1">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative"
            style={{
              animation: "textGlow 6s ease-in-out infinite",
            }}
          >
            Sign in to your Certara
            <span
              className="inline-block w-1 h-1 bg-white rounded-full ml-0.5 mr-1"
              style={{
                animation: "subtlePulse 4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span className="pl-1">account</span>
          </h1>
        </header>

        <main
          ref={containerRef}
          className="relative rounded-xl p-8 sm:p-10 overflow-visible border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift"
        >
          {isHovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
              style={getGlassStyle(mousePosition, isHovering)}
              aria-hidden="true"
            />
          )}

          <form onSubmit={handleSubmit} className="relative z-10" noValidate>
            <fieldset
              disabled={isLoading}
              className="flex flex-col gap-8 disabled:opacity-75 disabled:pointer-events-none"
            >
              <legend className="sr-only">Login credentials</legend>

              <div className="grid gap-4 animate-stagger-2">
                <Label htmlFor="email" className="text-white text-sm font-medium smooth-transition">
                  Enter Your Email Address
                </Label>
                <div className="relative">
                  <Input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-describedby="email-description"
                    className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline"
                  />
                  {isEmailHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(emailMousePosition, isEmailHovering)}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div id="email-description" className="sr-only">
                  Enter your registered email address
                </div>
              </div>

              <div className="grid gap-4 animate-stagger-3">
                <Label htmlFor="password" className="text-white text-sm font-medium smooth-transition">
                  Enter Your Password
                  <span className="pl-40 text-gray-300 hover:text-gray-400 transition-colors duration-300">
                    Forgot Password?
                  </span>
                </Label>
                <div ref={passwordRef} className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    aria-describedby="password-description"
                    className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pr-12 h-12 px-4 no-outline"
                  />
                  {isPasswordHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(passwordMousePosition, isPasswordHovering)}
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 z-20 no-outline rounded p-1"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div id="password-description" className="sr-only">
                  Enter your account password. Minimum 6 characters required.
                </div>
              </div>

              <div className="flex gap-4 animate-stagger-4">
                <Button
                  ref={cancelRef}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => (window.location.href = "/")}
                  className="flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift"
                >
                  {isCancelHovering && !isLoading && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(cancelMousePosition, isCancelHovering)}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 flex-row">Cancel</span>
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline disabled:opacity-50 disabled:cursor-not-allowed smooth-button-bounce hover-lift"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Signing in...</span>
                      <span className="sr-only">Please wait while we authenticate your credentials</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </fieldset>
            <div className="pt-5"></div>
          </form>
          <div className="pt-4"></div>
        </main>

        <footer className="text-center text-xs text-white/40 space-y-2 animate-stagger-4">
          <p>© 2025 Certera. All rights reserved.</p>
          <nav aria-label="Footer navigation">
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#" className="hover:text-white/60 smooth-transition no-outline rounded hover-lift">
                Privacy Policy
              </a>
              <span className="hidden sm:inline" aria-hidden="true">
                •
              </span>
              <a href="#" className="hover:text-white/60 smooth-transition no-outline rounded hover-lift">
                Terms of Service
              </a>
              <span className="hidden sm:inline" aria-hidden="true">
                •
              </span>
              <a href="#" className="hover:text-white/60 smooth-transition no-outline rounded hover-lift">
                Support
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </>
  )
}
