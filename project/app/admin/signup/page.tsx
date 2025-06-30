import { SignupForm } from "@/components/signup-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-xs rounded-lg bg-white/10 backdrop-blur-md p-6">
        <SignupForm />
      </div>
    </div>
  )
}

