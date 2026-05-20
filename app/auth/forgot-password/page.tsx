"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/layout/logo"
import { FadeInUp } from "@/components/ui/animations"
import { ROUTES } from "@/lib/constants"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmittedEmail(data.email)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            {isSubmitted ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Check Your Email</h2>
                <p className="text-muted-foreground mb-6">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{submittedEmail}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href={ROUTES.auth.login}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Forgot Password?</h2>
                  <p className="text-muted-foreground text-sm">
                    No worries! Enter your email and we&apos;ll send you a reset link.
                  </p>
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

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
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
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
