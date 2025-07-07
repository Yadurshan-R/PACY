"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Users, GraduationCap, ArrowLeft, Search, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface Student {
  id: string
  studentName: string
  nicNumber: string
  dateIssued: string
  hashNo: string
}

interface Degree {
  id: number
  degreeName: string
  studentCount: number
}

interface MousePosition {
  x: number
  y: number
}

export default function StudentRecordsPage() {
  const router = useRouter()
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [backButtonMousePosition, setBackButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isBackButtonHovering, setIsBackButtonHovering] = useState(false)
  const [searchMousePosition, setSearchMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isSearchHovering, setIsSearchHovering] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      sessionStorage.clear();
      localStorage.clear();
    }
  }, [router]);

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
      backButton: backButtonRef.current,
      search: searchRef.current,
    }

    const handlers = {
      container: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setMousePosition, containerRef),
        mouseenter: () => setIsHovering(true),
        mouseleave: () => setIsHovering(false),
      },
      backButton: {
        mousemove: (e: MouseEvent) => handleMouseMove(e, setBackButtonMousePosition, backButtonRef),
        mouseenter: () => setIsBackButtonHovering(true),
        mouseleave: () => setIsBackButtonHovering(false),
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
    const fetchDegrees = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch("/api/record/get-courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          console.error("Failed to fetch courses");
          return;
        }

        const data = await response.json();
        const courses = data.courses.map((course: any, index: number) => ({
          id: index + 1, // You can use `course.courseId` if it's numeric
          degreeName: course.courseName,
          studentCount: course.studentCount,
        }));

        setDegrees(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDegrees();
  }, []);


  const handleDegreeClick = async (degree: Degree) => {
    setLoadingStudents(true)
    setSelectedDegree(degree)
    setSearchTerm("")

    try {
      const userId = sessionStorage.getItem("userId")
      if (!userId) return

      const response = await fetch("/api/record/get-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          courseId: degree.id.toString(), // assuming id = courseId
        }),
      })

      if (!response.ok) {
        console.error("Failed to fetch student records")
        return
      }

      const data = await response.json()
      const mappedStudents = data.candidates.map((candidate: any) => ({
        id: candidate._id, // MongoDB ObjectId
        studentName: candidate.candidateName,
        nicNumber: candidate.nicNumber,
        dateIssued: candidate.dateIssued,
        hashNo: candidate.blockHash,
      }))

      setStudents(mappedStudents)
    } catch (err) {
      console.error("Error fetching student data:", err)
    } finally {
      setLoadingStudents(false)
    }
  }


  const handleBackToDegrees = () => {
    setSelectedDegree(null)
    setStudents([])
    setSearchTerm("")
  }

  const handleBackToHome = () => {
    router.push("/home")
  }

  const filteredStudents = students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nicNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.hashNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedDegree) {
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
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">

              <div className="mb-8 animate-stagger-1">
                <div className="flex gap-4 mb-6">

                  <Button
                    onClick={handleBackToDegrees}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white hover:text-white smooth-transition hover-lift"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Degrees
                  </Button>
                </div>

                <div className="text-center">
                  <h1
                    className="text-3xl md:text-4xl text-white font-light tracking-normal mb-2"
                    style={{ animation: "textGlow 6s ease-in-out infinite" }}
                  >
                    {selectedDegree.degreeName}
                    <span
                      className="inline-block w-1 h-1 bg-white rounded-full ml-1"
                      style={{ animation: "subtlePulse 4s ease-in-out infinite" }}
                      aria-hidden="true"
                    />
                  </h1>
                  <p className="text-white/70 text-lg">Student Records & Certificates</p>
                </div>
              </div>

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
                      <Users className="h-5 w-5 text-white/70" />
                      <span className="text-white/70 font-medium">
                        {searchTerm
                          ? `${filteredStudents.length} of ${students.length} students`
                          : `${students.length} students enrolled`}
                      </span>
                    </div>

                    <div className="relative max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                      <Input
                        ref={searchRef}
                        type="text"
                        placeholder="Search students..."
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

                  {loadingStudents ? (
                    <div className="text-center py-16 animate-stagger-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" />
                      <p className="text-white/70">Loading students...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto animate-stagger-3">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left text-white font-semibold py-4 px-4">Student Name</th>
                            <th className="text-left text-white font-semibold py-4 px-4">NIC Number</th>
                            <th className="text-left text-white font-semibold py-4 px-4">Date Issued</th>
                            <th className="text-left text-white font-semibold py-4 px-4">Certificate Hash</th>
                            <th className="text-left text-white font-semibold py-4 px-4">View Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.map((student, index) => (
                            <tr
                              key={student.id}
                              className={`hover:bg-white/5 smooth-transition ${index !== filteredStudents.length - 1 ? "border-b border-white/10" : ""
                                }`}
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white/70" />
                                  </div>
                                  <span className="font-medium text-white">{student.studentName}</span>
                                </div>
                              </td>
                              <td className="text-white/60 py-4 px-4">{student.nicNumber}</td>
                              <td className="text-white/60 py-4 px-4">
                                {new Date(student.dateIssued).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="text-white/60 py-4 px-4">
                                <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-white/80">
                                  {student.hashNo}
                                </code>
                              </td>

                              <td className="text-white/60 py-4 px-4">
                                <a
                                  href={`/certificate/${student.hashNo}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors"
                                  title="View Certificate"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {filteredStudents.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                          <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-6 w-6 text-white/50" />
                          </div>
                          <p className="text-white/70 text-lg mb-2">No students found</p>
                          <p className="text-white/50 text-sm">No students match your search for "{searchTerm}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    )
  }

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
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button
                ref={backButtonRef}
                onClick={handleBackToHome}
                className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline hover-lift"
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
                  Back to Home
                </span>
              </Button>
            </div>
            <header className="text-center mb-12 animate-stagger-1">
              <h1
                className="text-4xl md:text-5xl text-white font-light tracking-normal mb-4"
                style={{ animation: "textGlow 6s ease-in-out infinite" }}
              >
                Student Records
                <span
                  className="inline-block w-1 h-1 bg-white rounded-full ml-1"
                  style={{ animation: "subtlePulse 4s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-white/70 text-xl">Select a degree program to view student records and certificates</p>
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
                <div className="flex items-center gap-2 mb-6 animate-stagger-2">
                  <GraduationCap className="h-5 w-5 text-white/70" />
                  <span className="text-white/70 font-medium">Available Degree Programs ({degrees.length})</span>
                </div>

                {loading ? (
                  <div className="text-center py-16 animate-stagger-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" />
                    <p className="text-white/70">Loading degree programs...</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:gap-6 animate-stagger-3">
                    {degrees.map((degree) => (
                      <div
                        key={degree.id}
                        onClick={() => handleDegreeClick(degree)}
                        className="cursor-pointer p-6 border border-white/20 rounded-lg hover:bg-white/5 smooth-transition hover-lift"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{degree.degreeName}</h3>
                            <div className="flex items-center gap-2 text-white/60">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">{degree.studentCount} students enrolled</span>
                            </div>
                          </div>
                          <div className="text-white/40 hover:text-white/70 smooth-transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>

            <footer className="text-center text-xs text-white/40 space-y-2 mt-8 animate-stagger-4">
              <p>© 2025 Certera. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
