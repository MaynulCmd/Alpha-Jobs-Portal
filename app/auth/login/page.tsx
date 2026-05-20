"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/layout/logo"
import { FadeInUp, FloatingCircles } from "@/components/ui/animations"
import { useAuthStore } from "@/lib/store"
import { ROUTES } from "@/lib/constants"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo login - in production, this would be a real API call
      if (data.email === "admin@alphajobs.com") {
        setUser({
          id: "admin-1",
          email: data.email,
          name: "Admin User",
          role: "ADMIN",
        })
        router.push(ROUTES.admin.dashboard)
      } else if (data.email === "employer@alphajobs.com") {
        setUser({
          id: "employer-1",
          email: data.email,
          name: "Employer User",
          role: "EMPLOYER",
        })
        router.push(ROUTES.employer.dashboard)
      } else {
        // Default to seeker
        setUser({
          id: "seeker-1",
          email: data.email,
          name: "Job Seeker",
          role: "SEEKER",
        })
        router.push(ROUTES.seeker.dashboard)
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <FloatingCircles />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <FadeInUp>
            <Logo className="mb-8" />
            <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
              Welcome Back to Alpha Jobs
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Sign in to access your dashboard, manage applications, and discover new opportunities in Saudi Arabia.
            </p>
          </FadeInUp>

          <FadeInUp className="mt-12">
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">2.5K+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Job Seekers</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href={ROUTES.home}>
              <Logo className="justify-center" />
            </Link>
          </div>

          <FadeInUp>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Sign In</h2>
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href={ROUTES.auth.register} className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials */}
            <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border text-sm">
              <p className="font-medium text-foreground mb-2">Demo Accounts:</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li><code className="bg-muted px-1 rounded">seeker@alphajobs.com</code> - Job Seeker</li>
                <li><code className="bg-muted px-1 rounded">employer@alphajobs.com</code> - Employer</li>
                <li><code className="bg-muted px-1 rounded">admin@alphajobs.com</code> - Admin</li>
              </ul>
              <p className="text-xs mt-2 text-muted-foreground">Password: any 6+ characters</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 h-12 ${errors.email ? "border-destructive" : ""}`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={ROUTES.auth.forgotPassword}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 h-12 ${errors.password ? "border-destructive" : ""}`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" {...register("remember")} />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
