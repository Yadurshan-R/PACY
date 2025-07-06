"use client"

interface University {
  id: number
  universityName: string
  location: string
  email: string
  contactNumber: string
  logo: string | null
}

interface UniversityTableProps {
  universities: University[]
  loading?: boolean
}

export default function UniversityTable({ universities, loading = false }: UniversityTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" />
        <p className="text-white/70 text-sm">Loading Organizations...</p>
      </div>
    )
  }

  return (
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
            <tr key={uni.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
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
  )
}
