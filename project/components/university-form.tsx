"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Users, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

interface ValidationError {
  field: string
  message: string
}

interface University {
  id: number
  universityName: string
  location: string
  email: string
  contactNumber: string
  logo: string | null
}

interface MousePosition {
  x: number
  y: number
}

export function UniversitySetupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showUsers, setShowUsers] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [loadingUniversities, setLoadingUniversities] = useState(false)
  const [cities, setCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [formData, setFormData] = useState({
    universityName: "",
    location: "",
    email: "",
    contactNumber: "",
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoBase64, setLogoBase64] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [uniNameMousePosition, setUniNameMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isUniNameHovering, setIsUniNameHovering] = useState(false)
  const [locationMousePosition, setLocationMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isLocationHovering, setIsLocationHovering] = useState(false)
  const [emailMousePosition, setEmailMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isEmailHovering, setIsEmailHovering] = useState(false)
  const [contactMousePosition, setContactMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isContactHovering, setIsContactHovering] = useState(false)
  const [tableMousePosition, setTableMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isTableHovering, setIsTableHovering] = useState(false)
  const [viewButtonMousePosition, setViewButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isViewButtonHovering, setIsViewButtonHovering] = useState(false)
  const [continueButtonMousePosition, setContinueButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isContinueButtonHovering, setIsContinueButtonHovering] = useState(false)
  const [backButtonMousePosition, setBackButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isBackButtonHovering, setIsBackButtonHovering] = useState(false)
  const [submitButtonMousePosition, setSubmitButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isSubmitButtonHovering, setIsSubmitButtonHovering] = useState(false)
  const [isCancelHovering, setIsCancelHovering] = useState(false)
  const [cancelMousePosition, setCancelMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const uniNameRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const contactRef = useRef<HTMLInputElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const viewButtonRef = useRef<HTMLButtonElement>(null)
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

const fetchUniversities = useCallback(async () => {
  setLoadingUniversities(true)
  try {
    const response = await fetch("/api/auth/admin/universities")
    const data = await response.json()
    setUniversities(data.universities)
  } catch (error) {
    console.error("Failed to fetch universities:", error)
    toast.error("Failed to load universities", {
      description: "Could not load the list of universities. Please try again.",
      duration: 4000,
    })
  } finally {
    setLoadingUniversities(false)
  }
}, [])

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true)
      try {
        const response = await fetch("/api/auth/admin/cities")
        const data = await response.json()
        setCities(data.cities)
      } catch (error) {
        console.error("Failed to fetch cities:", error)
        toast.error("Failed to load cities", {
          description: "Could not load the list of cities. Please try again.",
          duration: 4000,
        })
      } finally {
        setLoadingCities(false)
      }
    }

    fetchCities()
  }, [])

  const validateStep1 = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = []

    if (!formData.universityName?.trim()) {
      errors.push({ field: "universityName", message: "University name is required" })
    }

    if (!formData.location) {
      errors.push({ field: "location", message: "Location is required" })
    }

    return errors
  }, [formData.universityName, formData.location])

  const validateStep2 = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = []

    if (!formData.email?.trim()) {
      errors.push({ field: "email", message: "Email address is required" })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({ field: "email", message: "Invalid email address format" })
    }

    if (!formData.contactNumber?.trim()) {
      errors.push({ field: "contactNumber", message: "Contact number is required" })
    } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.contactNumber)) {
      errors.push({ field: "contactNumber", message: "Invalid contact number format" })
    }

    return errors
  }, [formData.email, formData.contactNumber])

  const showErrorToast = useCallback((errors: ValidationError[]) => {
    const firstError = errors[0]
    const remainingCount = errors.length - 1
    const heading = "Validation Error"
    let subtext = firstError.message

    if (remainingCount > 0) {
      subtext = `${firstError.message} (${remainingCount} more issue${remainingCount > 1 ? "s" : ""} found)`
    }

    toast.error(heading, {
      description: subtext,
      duration: 6000,
    })
  }, [])

  const showSuccessToast = useCallback(() => {
    toast.success("University Setup Complete", {
      description: "Your university has been successfully configured.",
      duration: 4000,
    })
  }, [])

  const convertToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }, [])

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid File Type", {
          description: "Please select an image file (PNG, JPG, GIF, etc.)",
          duration: 4000,
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: "Please select an image smaller than 5MB",
          duration: 4000,
        })
        return
      }

      try {
        const base64 = await convertToBase64(file)
        setLogoFile(file)
        setLogoBase64(base64)
      } catch (error) {
        toast.error("File Processing Error", {
          description: "Failed to process the selected file",
          duration: 4000,
        })
      }
    },
    [convertToBase64],
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const file = e.dataTransfer.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const removeLogo = useCallback(() => {
    setLogoFile(null)
    setLogoBase64("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleNextStep = useCallback(() => {
    const errors = validateStep1()
    if (errors.length > 0) {
      showErrorToast(errors)
      return
    }
    setCurrentStep(2)
  }, [validateStep1, showErrorToast])

  const handlePrevStep = useCallback(() => {
    setCurrentStep(1)
  }, [])

  const handleViewUsers = useCallback(() => {
    setShowUsers(true)
    fetchUniversities();
  }, [])

  const handleBackToForm = useCallback(() => {
    setShowUsers(false)
    setTimeout(() => {
    }, 50)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const errors = validateStep2()

      if (errors.length > 0) {
        showErrorToast(errors)
        return
      }

      setIsLoading(true)
      const adminToken = sessionStorage.getItem('accessToken');
      try {
        const universityData = {
          orgName: formData.universityName,
          location: formData.location,
          email: formData.email,
          contactNo: formData.contactNumber,
          logo: logoBase64 || null,
        }

        const response = await fetch("/api/auth/admin/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${adminToken}`,
          },
          body: JSON.stringify(universityData),
        })
        const result = await response.json()
        if (result.ok) {
          console.log("Organization Added Successfully.")
          showSuccessToast()

          setFormData({
            universityName: "",
            location: "",
            email: "",
            contactNumber: "",
          })
          setLogoFile(null)
          setLogoBase64("")
          setCurrentStep(1)

          setTimeout(() => {
            
          }, 1500)
        } else {
          toast.error(result.heading, {
            description : result.message,
            duration: 6000,
          })
        }
      } catch (error) {
        toast.error("Setup Failed", {
          description: "Failed to setup university. Please try again.",
          duration: 6000,
        })
        console.error("University setup failed:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [validateStep2, showErrorToast, showSuccessToast, formData, logoBase64],
  )

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

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

  useEffect(() => {
    const elements = {
      container: containerRef.current,
      uniName: uniNameRef.current,
      location: locationRef.current,
      email: emailRef.current,
      contact: contactRef.current,
      table: tableRef.current,
      viewButton: viewButtonRef.current,
      continueButton: continueButtonRef.current,
      backButton: backButtonRef.current,
      submitButton: submitButtonRef.current,
    }

    const handlers = {
      container: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMousePosition, containerRef),
        mouseenter: () => setIsHovering(true),
        mouseleave: () => setIsHovering(false),
      },
      uniName: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setUniNameMousePosition, uniNameRef),
        mouseenter: () => setIsUniNameHovering(true),
        mouseleave: () => setIsUniNameHovering(false),
      },
      location: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setLocationMousePosition, locationRef),
        mouseenter: () => setIsLocationHovering(true),
        mouseleave: () => setIsLocationHovering(false),
      },
      email: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setEmailMousePosition, emailRef),
        mouseenter: () => setIsEmailHovering(true),
        mouseleave: () => setIsEmailHovering(false),
      },
      contact: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setContactMousePosition, contactRef),
        mouseenter: () => setIsContactHovering(true),
        mouseleave: () => setIsContactHovering(false),
      },
      table: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setTableMousePosition, tableRef),
        mouseenter: () => setIsTableHovering(true),
        mouseleave: () => setIsTableHovering(false),
      },
      viewButton: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setViewButtonMousePosition, viewButtonRef),
        mouseenter: () => setIsViewButtonHovering(true),
        mouseleave: () => setIsViewButtonHovering(false),
      },
      continueButton: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setContinueButtonMousePosition, continueButtonRef),
        mouseenter: () => setIsContinueButtonHovering(true),
        mouseleave: () => setIsContinueButtonHovering(false),
      },
      backButton: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setBackButtonMousePosition, backButtonRef),
        mouseenter: () => setIsBackButtonHovering(true),
        mouseleave: () => setIsBackButtonHovering(false),
      },
      submitButton: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setSubmitButtonMousePosition, submitButtonRef),
        mouseenter: () => setIsSubmitButtonHovering(true),
        mouseleave: () => setIsSubmitButtonHovering(false),
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

  if (showUsers) {
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
          .animate-fade-in {
            animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .hover-lift:hover {
            transform: translateY(-1px);
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .smooth-transition {
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .no-outline:focus,
          .no-outline:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
          input:focus,
          button:focus,
          a:focus,
          select:focus,
          input:focus-visible,
          button:focus-visible,
          a:focus-visible,
          select:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in {
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
        <div className={cn("flex flex-col gap-8 w-full max-w-6xl mx-auto", className)} {...props}>
          <header className="text-center">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative"
              style={{
                animation: "textGlow 6s ease-in-out infinite",
              }}
            >
              Organizations
              <span
                className="inline-block w-1 h-1 bg-white rounded-full ml-0.5 mr-1"
                style={{
                  animation: "subtlePulse 4s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </h1>
          </header>

          <main
            ref={tableRef}
            className="relative rounded-xl p-8 border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in"
          >
            {isTableHovering && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
                style={getGlassStyle(tableMousePosition, isTableHovering)}
                aria-hidden="true"
              />
            )}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white/70" />
                <span className="text-white/70 text-sm">Total Organizations: {universities.length}</span>
              </div>
              <Button
                ref={backButtonRef}
                onClick={handleBackToForm}
                variant="outline"
                className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-10 px-4 no-outline hover-lift"
              >
                {isBackButtonHovering && (
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                    style={getGlassStyle(backButtonMousePosition, isBackButtonHovering)}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Setup
                </span>
              </Button>
            </div>

            {loadingUniversities ? (
              <div className="text-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" />
                <p className="text-white/70 text-sm">Loading Organizations...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/80 text-sm font-medium py-3 px-4">Organisation Name</th>
                      <th className="text-left text-white/80 text-sm font-medium py-3 px-4">Location</th>
                      <th className="text-left text-white/80 text-sm font-medium py-3 px-4">Email Address</th>
                      <th className="text-left text-white/80 text-sm font-medium py-3 px-4">Contact No</th>
                      <th className="text-left text-white/80 text-sm font-medium py-3 px-4">Logo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universities.map((uni) => (
                      <tr key={uni.id} className="border-b border-white/10 hover:bg-white/5 smooth-transition">
                        <td className="text-white text-sm py-3 px-4 font-medium">{uni.universityName}</td>
                        <td className="text-white/70 text-sm py-3 px-4">{uni.location}</td>
                        <td className="text-white/70 text-sm py-3 px-4">{uni.email}</td>
                        <td className="text-white/70 text-sm py-3 px-4">{uni.contactNumber}</td>
                        <td className="text-sm py-3 px-4">
                          {uni.logo ? (
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                              <img
                                src={uni.logo || "/placeholder.svg"}
                                alt={`${uni.universityName} logo`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                              <span className="text-white/40 text-xs">No Logo</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </>
    )
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
        .smooth-transition {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .no-outline:focus,
        .no-outline:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        input:focus,
        button:focus,
        a:focus,
        select:focus,
        input:focus-visible,
        button:focus-visible,
        a:focus-visible,
        select:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-stagger-1,
          .animate-stagger-2,
          .animate-stagger-3,
          .animate-stagger-4 {
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
        className={cn("flex flex-col gap-8 sm:gap-12 w-full max-w-lg mx-auto", className)}
        {...props}
        key={showUsers ? "users" : `form-${currentStep}`}
      >
        <header className="text-center animate-stagger-1">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative"
            style={{
              animation: "textGlow 6s ease-in-out infinite",
            }}
          >
            Setup Your Organization
            <span
              className="inline-block w-1 h-1 bg-white rounded-full ml-0.5 mr-1"
              style={{
                animation: "subtlePulse 4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </h1>
        </header>

        <main
          ref={containerRef}
          className="relative rounded-xl p-8 sm:p-10 border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift"
        >
          {isHovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
              style={getGlassStyle(mousePosition, isHovering)}
              aria-hidden="true"
            />
          )}
          {currentStep === 1 ? (
            <div className="relative z-10">
              <div className="flex flex-col gap-8">
                <div className="grid gap-4 animate-stagger-2">
                  <Label htmlFor="universityName" className="text-white text-sm font-medium smooth-transition">
                    Enter Your Organization Name
                  </Label>
                  <div className="relative">
                    <Input
                      ref={uniNameRef}
                      id="universityName"
                      name="universityName"
                      type="text"
                      required
                      value={formData.universityName}
                      onChange={(e) => updateFormData("universityName", e.target.value)}
                      className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline"
                    />
                    {isUniNameHovering && (
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                        style={getGlassStyle(uniNameMousePosition, isUniNameHovering)}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div className="grid gap-4 animate-stagger-3">
                  <Label htmlFor="location" className="text-white text-sm font-medium smooth-transition">
                    Enter Your Location
                  </Label>
                  <div ref={locationRef} className="relative">
                    <Select
                      value={formData.location}
                      onValueChange={(value) => updateFormData("location", value)}
                      disabled={loadingCities}
                    >
                      <SelectTrigger className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white h-20 px-5 no-outline w-full">
                        <SelectValue placeholder={loadingCities ? "Loading cities..." : ""} />
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-white/20 rounded-lg max-h-[200px] overflow-y-auto min-w-[var(--radix-select-trigger-width)]">
                        {cities.map((city) => (
                          <SelectItem
                            key={city}
                            value={city}
                            className="text-white hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white cursor-pointer"
                          >
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isLocationHovering && (
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                        style={getGlassStyle(locationMousePosition, isLocationHovering)}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 animate-stagger-4">
                  <Button
                    ref={cancelRef}
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = "/sign-in";
                    }}
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
                    ref={continueButtonRef}
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline hover-lift"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10" noValidate>
              <fieldset
                disabled={isLoading}
                className="flex flex-col gap-8 disabled:opacity-75 disabled:pointer-events-none"
              >
                <legend className="sr-only">Contact details and logo</legend>

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
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
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
                </div>

                <div className="grid gap-4 animate-stagger-3">
                  <Label htmlFor="contactNumber" className="text-white text-sm font-medium smooth-transition">
                    Enter Your Contact Number
                  </Label>
                  <div className="relative">
                    <Input
                      ref={contactRef}
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={(e) => updateFormData("contactNumber", e.target.value)}
                      className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline"
                    />
                    {isContactHovering && (
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                        style={getGlassStyle(contactMousePosition, isContactHovering)}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div className="grid gap-4 animate-stagger-4">
                  <Label className="text-white text-sm font-medium smooth-transition">Enter Your Organization Logo</Label>

                  {!logoFile ? (
                    <div
                      className={cn(
                        "relative rounded-xl p-8 text-center smooth-transition cursor-pointer group",
                        "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
                        "border border-white/20 hover:border-white/30",
                        "hover:from-white/8 hover:to-white/15",
                        dragActive ? "border-white/50 from-white/10 to-white/20 scale-[1.02]" : "",
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center smooth-transition",
                            "bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-sm",
                            "group-hover:from-white/15 group-hover:to-white/25",
                            dragActive ? "scale-110 from-white/20 to-white/30" : "",
                          )}
                        >
                          <Upload
                            className={cn(
                              "h-8 w-8 text-white/60 smooth-transition",
                              "group-hover:text-white/80",
                              dragActive ? "text-white scale-110" : "",
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-base font-medium">
                            {dragActive ? "Drop your logo here" : "Upload Your Organization Logo"}
                          </p>
                          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                          </div>
                        </div>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative border border-white/20 rounded-xl p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20">
                          <img
                            src={logoBase64 || "/placeholder.svg"}
                            alt="University logo preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-base font-medium">{logoFile.name}</p>
                          <p className="text-white/60 text-sm">{(logoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          <div className="mt-2">
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full w-full"></div>
                            </div>
                            <p className="text-green-400 text-xs mt-1">Upload complete</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeLogo}
                          className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg p-2"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    ref={cancelRef}
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => setCurrentStep(1)}
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
                    ref={submitButtonRef}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        <span>Setting up...</span>
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                </div>
              </fieldset>
            </form>
          )}
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
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            ref={viewButtonRef}
            type="button"
            onClick={handleViewUsers}
            variant="outline"
            className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 px-6 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift"
          >
            {isViewButtonHovering && !isLoading && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                style={getGlassStyle(viewButtonMousePosition, isViewButtonHovering)}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 flex items-center">View Organizations</span>
          </Button>
        </div>
      </div>
    </>
  )
}
