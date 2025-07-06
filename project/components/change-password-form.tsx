"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MousePosition {
  x: number;
  y: number;
}

interface ValidationError {
  field: string;
  message: string;
}

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [cancelMousePosition, setCancelMousePosition] = useState<MousePosition>(
    { x: 0, y: 0 }
  );
  const [isCancelHovering, setIsCancelHovering] = useState(false);
  const [newPasswordMousePosition, setNewPasswordMousePosition] =
    useState<MousePosition>({ x: 0, y: 0 });
  const [isNewPasswordHovering, setIsNewPasswordHovering] = useState(false);
  const [confirmPasswordMousePosition, setConfirmPasswordMousePosition] =
    useState<MousePosition>({ x: 0, y: 0 });
  const [isConfirmPasswordHovering, setIsConfirmPasswordHovering] =
    useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const newPasswordRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (
      e: MouseEvent,
      setter: (pos: MousePosition) => void,
      ref: React.RefObject<HTMLElement>
    ) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setter({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    []
  );

  useEffect(() => {
    const elements = {
      container: containerRef.current,
      cancel: cancelRef.current,
      newPassword: newPasswordRef.current,
      confirmPassword: confirmPasswordRef.current,
    };

    const handlers = {
      container: {
        mousemove: (e: MouseEvent) =>
          handleMouseMove(e, setMousePosition, containerRef),
        mouseenter: () => setIsHovering(true),
        mouseleave: () => setIsHovering(false),
      },
      cancel: {
        mousemove: (e: MouseEvent) =>
          handleMouseMove(e, setCancelMousePosition, cancelRef),
        mouseenter: () => setIsCancelHovering(true),
        mouseleave: () => setIsCancelHovering(false),
      },
      newPassword: {
        mousemove: (e: MouseEvent) =>
          handleMouseMove(e, setNewPasswordMousePosition, newPasswordRef),
        mouseenter: () => setIsNewPasswordHovering(true),
        mouseleave: () => setIsNewPasswordHovering(false),
      },
      confirmPassword: {
        mousemove: (e: MouseEvent) =>
          handleMouseMove(
            e,
            setConfirmPasswordMousePosition,
            confirmPasswordRef
          ),
        mouseenter: () => setIsConfirmPasswordHovering(true),
        mouseleave: () => setIsConfirmPasswordHovering(false),
      },
    };

    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        const elementHandlers = handlers[key as keyof typeof handlers];
        Object.entries(elementHandlers).forEach(([event, handler]) => {
          element.addEventListener(event, handler as EventListener, {
            passive: true,
          });
        });
      }
    });

    return () => {
      Object.entries(elements).forEach(([key, element]) => {
        if (element) {
          const elementHandlers = handlers[key as keyof typeof handlers];
          Object.entries(elementHandlers).forEach(([event, handler]) => {
            element.removeEventListener(event, handler as EventListener);
          });
        }
      });
    };
  }, [handleMouseMove]);

  const validateForm = useCallback((formData: FormData): ValidationError[] => {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const errors: ValidationError[] = [];

    if (!newPassword?.trim()) {
      errors.push({
        field: "newPassword",
        message: "New password is required",
      });
    } else if (newPassword.length < 8) {
      errors.push({
        field: "newPassword",
        message: "Password must be at least 8 characters",
      });
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      errors.push({
        field: "newPassword",
        message: "Password must contain uppercase, lowercase, and number",
      });
    }

    if (!confirmPassword?.trim()) {
      errors.push({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
    } else if (newPassword !== confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Passwords do not match",
      });
    }

    return errors;
  }, []);

  const showErrorToast = useCallback((errors: ValidationError[]) => {
    const firstError = errors[0];
    const remainingCount = errors.length - 1;
    let message = firstError.message;

    if (remainingCount > 0) {
      message = `${firstError.message} (${remainingCount} more issue${
        remainingCount > 1 ? "s" : ""
      } found)`;
    }

    toast.error("Validation Error", {
      description: message,
      duration: 6000,
    });
  }, []);

  const showSuccessToast = useCallback(() => {
    toast.success("Password Reset Successful", {
      description: "Your password has been updated successfully.",
      duration: 4000,
    });
  }, []);

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
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const validationErrors = validateForm(formData);

      if (validationErrors.length > 0) {
        showErrorToast(validationErrors);
        const firstErrorField = validationErrors[0].field;
        if (
          firstErrorField === "newPassword" &&
          newPasswordRef.current?.querySelector("input")
        ) {
          (
            newPasswordRef.current.querySelector("input") as HTMLInputElement
          ).focus();
        } else if (
          firstErrorField === "confirmPassword" &&
          confirmPasswordRef.current?.querySelector("input")
        ) {
          (
            confirmPasswordRef.current.querySelector(
              "input"
            ) as HTMLInputElement
          ).focus();
        }
        return;
      }

      setIsLoading(true);
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in sessionStorage!");
          throw new Error("User ID not found.")
        }
        const newPassword = formData.get("confirmPassword") as string;

        const res = await fetch("/api/auth/sign-in/changePassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
          showSuccessToast();
          console.log("Password reset successful");
          router.push("/sign-in");
        } else {
          showAuthErrorToast(data.heading, data.message);
          console.error("Password reset failed:", data.message);
        }
      } catch (error) {
        showAuthErrorToast(
          "Internal Server Error",
          "An unexpected error occurred. Please try again later."
        );
        console.error("Password reset failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router, validateForm, showErrorToast, showSuccessToast, showAuthErrorToast]
  );

  const getGlassStyle = useMemo(() => {
    return (mousePos: MousePosition, isVisible: boolean) => {
      if (!isVisible) return {};
      return {
        background: `
          radial-gradient(ellipse 100px 60px at ${mousePos.x}px ${
          mousePos.y
        }px, 
            rgba(255,255,255,0.18) 0%, 
            rgba(255,255,255,0.08) 30%, 
            rgba(255,255,255,0.04) 50%, 
            transparent 70%),
          radial-gradient(ellipse 50px 30px at ${mousePos.x - 15}px ${
          mousePos.y - 10
        }px, 
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
      };
    };
  }, []);

  const toggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 0px rgba(255, 255, 255, 0);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
        }
        @keyframes subtlePulse {
          0%,
          100% {
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
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-fade-in {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stagger-1 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s
            both;
        }
        .animate-stagger-2 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s
            both;
        }
        .animate-stagger-3 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s
            both;
        }
        .animate-stagger-4 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s
            both;
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
      <div
        className={cn(
          "flex flex-col gap-8 sm:gap-12 w-full max-w-lg mx-auto",
          className
        )}
        {...props}
      >
        <header className="text-center animate-stagger-1">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative"
            style={{
              animation: "textGlow 6s ease-in-out infinite",
            }}
          >
            Set your new Certara
            <span className="block pl-1">
              password
              <span
                className="inline-block w-1 h-1 bg-white rounded-full ml-0.5"
                style={{
                  animation: "subtlePulse 4s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </span>
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
              <legend className="sr-only">Reset password credentials</legend>

              <div className="grid gap-4 animate-stagger-2">
                <Label
                  htmlFor="newPassword"
                  className="text-white text-sm font-medium smooth-transition"
                >
                  Enter New Password
                </Label>
                <div ref={newPasswordRef} className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    aria-describedby="new-password-description"
                    className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pr-12 h-12 px-4 no-outline"
                  />
                  {isNewPasswordHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(
                        newPasswordMousePosition,
                        isNewPasswordHovering
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                    aria-pressed={showNewPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 z-20 no-outline rounded p-1"
                  >
                    {showNewPassword ? (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div id="new-password-description" className="sr-only">
                  Enter your new password. Must be at least 8 characters with
                  uppercase, lowercase, and number.
                </div>
              </div>

              <div className="grid gap-4 animate-stagger-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-white text-sm font-medium smooth-transition"
                >
                  Confirm New Password
                </Label>
                <div ref={confirmPasswordRef} className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    aria-describedby="confirm-password-description"
                    className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pr-12 h-12 px-4 no-outline"
                  />
                  {isConfirmPasswordHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(
                        confirmPasswordMousePosition,
                        isConfirmPasswordHovering
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 z-20 no-outline rounded p-1"
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div id="confirm-password-description" className="sr-only">
                  Re-enter your new password to confirm it matches.
                </div>
              </div>

              <div className="flex gap-4 animate-stagger-4">
                <Button
                  ref={cancelRef}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => (window.location.href = "/sign-in")}
                  className="flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift"
                >
                  {isCancelHovering && !isLoading && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(
                        cancelMousePosition,
                        isCancelHovering
                      )}
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
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Resetting...</span>
                      <span className="sr-only">
                        Please wait while we reset your password
                      </span>
                    </>
                  ) : (
                    "Reset Password"
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
              <a
                href="#"
                className="hover:text-white/60 smooth-transition no-outline rounded hover-lift"
              >
                Privacy Policy
              </a>
              <span className="hidden sm:inline" aria-hidden="true">
                •
              </span>
              <a
                href="#"
                className="hover:text-white/60 smooth-transition no-outline rounded hover-lift"
              >
                Terms of Service
              </a>
              <span className="hidden sm:inline" aria-hidden="true">
                •
              </span>
              <a
                href="#"
                className="hover:text-white/60 smooth-transition no-outline rounded hover-lift"
              >
                Support
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
}
