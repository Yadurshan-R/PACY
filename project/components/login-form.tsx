'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.isAdmin) {
        router.push(data.redirect);
      }
      else if(res.ok) {
      // Save token if needed
      localStorage.setItem("token", data.token);

      router.push("/home");
      }
      else {
        setError(data.message || "Login failed");
        return;
      }
      
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>

      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="user@example.com" onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/signup"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>  

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}     
      </div>
    </form>
  )
}
