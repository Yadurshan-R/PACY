"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Building2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface Organization {
  id: number
  organizationName: string
  walletAddress: string
}

interface MousePosition {
  x: number
  y: number
}

// Sample organization data
const sampleOrganizations: Organization[] = [
  {
    id: 1,
    organizationName: "Tech Solutions Inc.",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: 2,
    organizationName: "Digital Innovations Ltd.",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: 3,
    organizationName: "Cyber Systems Corp.",
    walletAddress: "0x567890abcdef1234567890abcdef1234567890ab",
  },
  {
    id: 4,
    organizationName: "Business Dynamics LLC",
    walletAddress: "0x234567890abcdef1234567890abcdef123456789",
  },
  {
    id: 5,
    organizationName: "Corporate Solutions Group",
    walletAddress: "0x890abcdef1234567890abcdef1234567890abcde",
  },
  {
    id: 6,
    organizationName: "Engineering Excellence Co.",
    walletAddress: "0xcdef1234567890abcdef1234567890abcdef1234",
  },
  {
    id: 7,
    organizationName: "Infrastructure Partners",
    walletAddress: "0x4567890abcdef1234567890abcdef1234567890a",
  },
  {
    id: 8,
    organizationName: "Research Institute of Technology",
    walletAddress: "0xef1234567890abcdef1234567890abcdef123456",
  },
  {
    id: 9,
    organizationName: "Creative Arts Foundation",
    walletAddress: "0x67890abcdef1234567890abcdef1234567890abc",
  },
  {
    id: 10,
    organizationName: "Cultural Heritage Society",
    walletAddress: "0xf1234567890abcdef1234567890abcdef1234567",
  },
  {
    id: 11,
    organizationName: "Global Finance Corporation",
    walletAddress: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef",
  },
  {
    id: 12,
    organizationName: "Healthcare Innovation Hub",
    walletAddress: "0x9876543210fedcba0987654321fedcba09876543",
  },
  {
    id: 13,
    organizationName: "Sustainable Energy Solutions",
    walletAddress: "0xfedcba0987654321fedcba0987654321fedcba09",
  },
  {
    id: 14,
    organizationName: "Educational Technology Partners",
    walletAddress: "0x13579bdf2468ace013579bdf2468ace013579bdf",
  },
  {
    id: 15,
    organizationName: "Blockchain Development Consortium",
    walletAddress: "0xace02468bdf13579ace02468bdf13579ace02468",
  },
]

export default function OrganizationsPage() {
  const router = useRouter()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Mouse tracking states
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [searchMousePosition, setSearchMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isSearchHovering, setIsSearchHovering] = useState(false)

  // Refs for mouse tracking
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

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
      search: searchRef.current,
    }

    const handlers = {
      container: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMousePosition, containerRef),
        mouseenter: () => setIsHovering(true),
        mouseleave: () => setIsHovering(false),
      },
      search: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setSearchMousePosition, searchRef),
        mouseenter: () => setIsSearchHovering(true),
        mouseleave: () => setIsSearchHovering(false),
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
    // Simulate API call for organizations
    const timer = setTimeout(() => {
      setOrganizations(sampleOrganizations)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <style jsx>{`
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 0px rgba(255, 255, 255, 0); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUpStaggered {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-fade-in { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-stagger-1 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .animate-stagger-2 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .animate-stagger-3 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .animate-stagger-4 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .hover-lift:hover { transform: translateY(-1px); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .gentle-bounce { animation: gentleBounce 3s ease-in-out infinite; }
        .smooth-transition { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-outline:focus, .no-outline:focus-visible { outline: none !important; box-shadow: none !important; }
        input:focus, button:focus, a:focus, input:focus-visible, button:focus-visible, a:focus-visible {
          outline: none !important; box-shadow: none !important;
        }
      `}</style>

      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="text-center mb-16 animate-stagger-1">
              <h1
                className="text-4xl md:text-5xl text-white font-light tracking-normal mb-4"
                style={{ animation: "textGlow 6s ease-in-out infinite" }}
              >
                Organization Registry
                <span
                  className="inline-block w-1 h-1 bg-white rounded-full ml-1"
                  style={{ animation: "subtlePulse 4s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-white/70 text-xl">Registered organizations and their blockchain wallet addresses</p>
            </header>

            {/* Main Content */}
            <main
              ref={containerRef}
              className="relative rounded-xl p-8 overflow-visible border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift"
            >
              {isHovering && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
                  style={getGlassStyle(mousePosition, isHovering)}
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 animate-stagger-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-white/70" />
                    <span className="text-white/70 font-medium">
                      {searchTerm
                        ? `${filteredOrganizations.length} of ${organizations.length} organizations`
                        : `${organizations.length} organizations registered`}
                    </span>
                  </div>

                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      ref={searchRef}
                      type="text"
                      placeholder="Search organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pl-10 h-12 no-outline"
                    />
                    {isSearchHovering && (
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                        style={getGlassStyle(searchMousePosition, isSearchHovering)}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-16 animate-stagger-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" />
                    <p className="text-white/70">Loading organizations...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto animate-stagger-3">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white font-semibold py-4 px-4">Organization Name</th>
                          <th className="text-left text-white font-semibold py-4 px-4">Wallet Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrganizations.map((organization, index) => (
                          <tr
                            key={organization.id}
                            className={`hover:bg-white/5 smooth-transition ${
                              index !== filteredOrganizations.length - 1 ? "border-b border-white/10" : ""
                            }`}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center">
                                  <Building2 className="h-4 w-4 text-white/70" />
                                </div>
                                <span className="font-medium text-white">{organization.organizationName}</span>
                              </div>
                            </td>
                            <td className="text-white/60 py-4 px-4">
                              <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-white/80 break-all">
                                {organization.walletAddress}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredOrganizations.length === 0 && searchTerm && (
                      <div className="text-center py-12">
                        <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-6 w-6 text-white/50" />
                        </div>
                        <p className="text-white/70 text-lg mb-2">No organizations found</p>
                        <p className="text-white/50 text-sm">No organizations match your search for "{searchTerm}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </main>

            {/* Footer */}
            <footer className="text-center text-xs text-white/40 space-y-2 mt-8 animate-stagger-4">
              <p>© 2025 Certera. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
