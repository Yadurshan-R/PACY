import { ContactUsForm } from "@/components/contact-us-form"

export default function Page() {
  return (
    <div className="dark">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}
