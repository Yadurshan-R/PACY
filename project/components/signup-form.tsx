// 'use client'

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ChangeEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const router = useRouter();
//   const [orgname, setOrgname] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [logo, setLogo] = useState<File>();
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//         setLogo(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     const formData = new FormData();
//     formData.append("orgname", orgname);
//     formData.append("contact", contact);
//     formData.append("email", email);
//     formData.append()

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok && data.isAdmin) {
//         router.push(data.redirect);
//       }
//       else if(res.ok) {
//       // Save token if needed
//       localStorage.setItem("token", data.token);

//       router.push("/home");
//       }
//       else {
//         setError(data.message || "Login failed");
//         return;
//       }
      
//     } catch (err) {
//       setError("Something went wrong");
//       console.error(err);
//     }
//   };
//   return (
//     <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Signup New User</h1>

//       </div>
//       <div className="grid gap-6">
//         <div className="grid gap-3">
//           <Label htmlFor="orgname">Organization Name</Label>
//           <Input id="orgname" type="text" onChange={e => setOrgname(e.target.value)} required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="contact">Contact No</Label>
//           <Input id="contact" type="tel" onChange={e => setContact(e.target.value)} required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" type="email" placeholder="user@example.com" onChange={e => setEmail(e.target.value)} required />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="logo">Organization Logo</Label>
//           <Input id="logo" type="file" name="logo" accept="image/*" onChange={han} />
//         </div>       
        
//         <Button type="submit" className="w-full">
//           Signup
//         </Button>  

//         {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
//         {message && <p className="text-green-400 mb-4 text-sm">{message}</p>}

//       </div>
//     </form>
//   )
// }
