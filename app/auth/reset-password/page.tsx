"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/layout/logo"
import { FadeInUp } from "@/components/ui/animations"
import { ROUTES } from "@/lib/constants"

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Reset password with token:", token, "New password:", data.password)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Invalid Reset Link</h2>
        <p className="text-muted-foreground mb-6">
          This password reset link is invalid or has expired.
        </p>
        <Button asChild>
          <Link href={ROUTES.auth.forgotPassword}>Request New Link</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {isSubmitted ? (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Password Reset!</h2>
          <p className="text-muted-foreground mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <Button asChild className="w-full">
            <Link href={ROUTES.auth.login}>Sign In</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Reset Your Password</h2>
            <p className="text-muted-foreground text-sm">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className={`pl-10 h-12 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href={ROUTES.auth.login}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <FadeInUp>
          <div className="text-center mb-8">
            <Link href={ROUTES.home}>
              <Logo className="justify-center mb-8" />
            </Link>
          </div>

          <div className="bg-card rounded-xl border border-border p-8">
            <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
