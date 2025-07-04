import { NextResponse } from "next/server"

export async function GET() {
  const universities = [
    {
      id: 1,
      universityName: "University of Colombo",
      location: "Colombo",
      email: "info@cmb.ac.lk",
      contactNumber: "+94 11 258 1835",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      universityName: "University of Peradeniya",
      location: "Kandy",
      email: "registrar@pdn.ac.lk",
      contactNumber: "+94 81 239 4914",
      logo: null,
    },
    {
      id: 3,
      universityName: "University of Moratuwa",
      location: "Moratuwa",
      email: "info@mrt.ac.lk",
      contactNumber: "+94 11 265 0301",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      universityName: "University of Sri Jayewardenepura",
      location: "Sri Jayawardenepura Kotte",
      email: "info@sjp.ac.lk",
      contactNumber: "+94 11 275 8000",
      logo: null,
    },
    {
      id: 5,
      universityName: "University of Kelaniya",
      location: "Kelaniya",
      email: "registrar@kln.ac.lk",
      contactNumber: "+94 11 291 4479",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 6,
      universityName: "University of Jaffna",
      location: "Jaffna",
      email: "info@jfn.ac.lk",
      contactNumber: "+94 21 221 8194",
      logo: null,
    },
    {
      id: 7,
      universityName: "Eastern University, Sri Lanka",
      location: "Batticaloa",
      email: "info@esn.ac.lk",
      contactNumber: "+94 65 205 5000",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 8,
      universityName: "South Eastern University of Sri Lanka",
      location: "Oluvil",
      email: "info@seu.ac.lk",
      contactNumber: "+94 67 205 5000",
      logo: null,
    },
  ]

  return NextResponse.json({ universities })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newUniversity = {
      id: Date.now(), 
      ...body,
    }

    console.log("New university:", newUniversity)

    return NextResponse.json({ success: true, university: newUniversity })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create university" }, { status: 500 })
  }
}
