"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building2, Briefcase, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/layout/logo"
import { FadeInUp, FloatingCircles } from "@/components/ui/animations"
import { useAuthStore } from "@/lib/store"
import { ROUTES, REGIONS, CITIES, NATIONALITIES, INDUSTRIES, COMPANY_SIZES, JOB_CATEGORIES } from "@/lib/constants"

// Seeker registration schema
const seekerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  phone: z.string().min(9, "Please enter a valid phone number"),
  city: z.string().min(1, "Please select a city"),
  nationality: z.string().min(1, "Please select your nationality"),
  preferredCategory: z.string().optional(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Employer registration schema
const employerSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyEmail: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  contactPersonName: z.string().min(2, "Contact name must be at least 2 characters"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  locationCity: z.string().min(1, "Please select a city"),
  locationRegion: z.string().min(1, "Please select a region"),
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select company size"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SeekerFormData = z.infer<typeof seekerSchema>
type EmployerFormData = z.infer<typeof employerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [accountType, setAccountType] = useState<"seeker" | "employer">("seeker")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("")

  const seekerForm = useForm<SeekerFormData>({
    resolver: zodResolver(seekerSchema),
    defaultValues: { terms: false },
  })

  const employerForm = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: { terms: false },
  })

  const onSeekerSubmit = async (data: SeekerFormData) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUser({
        id: `seeker-${Date.now()}`,
        email: data.email,
        name: data.fullName,
        role: "SEEKER",
      })
      router.push(ROUTES.seeker.dashboard)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onEmployerSubmit = async (data: EmployerFormData) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUser({
        id: `employer-${Date.now()}`,
        email: data.companyEmail,
        name: data.contactPersonName,
        role: "EMPLOYER",
      })
      router.push(ROUTES.employer.dashboard)
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableCities = selectedRegion ? CITIES[selectedRegion as keyof typeof CITIES] || [] : []

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <FloatingCircles />
        <div className="relative z-10 flex flex-col justify-center px-12">
          <FadeInUp>
            <Link href={ROUTES.home}>
              <Logo className="mb-8" />
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              Start Your Journey with Alpha Jobs
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Join thousands of professionals and companies finding their perfect match in Saudi Arabia&apos;s leading job portal.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col py-8 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href={ROUTES.home}>
              <Logo className="justify-center" />
            </Link>
          </div>

          <FadeInUp>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href={ROUTES.auth.login} className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Account Type Tabs */}
            <Tabs value={accountType} onValueChange={(v) => setAccountType(v as "seeker" | "employer")} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="seeker" className="gap-2">
                  <User className="h-4 w-4" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger value="employer" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Employer
                </TabsTrigger>
              </TabsList>

              {/* Seeker Registration Form */}
              <TabsContent value="seeker" className="mt-6">
                <form onSubmit={seekerForm.handleSubmit(onSeekerSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          placeholder="Your full name"
                          className="pl-9"
                          {...seekerForm.register("fullName")}
                        />
                      </div>
                      {seekerForm.formState.errors.fullName && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-9"
                          {...seekerForm.register("email")}
                        />
                      </div>
                      {seekerForm.formState.errors.email && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          className="pl-9 pr-9"
                          {...seekerForm.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {seekerForm.formState.errors.password && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        {...seekerForm.register("confirmPassword")}
                      />
                      {seekerForm.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+966 XXX XXX XXX"
                          className="pl-9"
                          {...seekerForm.register("phone")}
                        />
                      </div>
                      {seekerForm.formState.errors.phone && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Select onValueChange={(v) => seekerForm.setValue("city", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(CITIES).flat().map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {seekerForm.formState.errors.city && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nationality *</Label>
                      <Select onValueChange={(v) => seekerForm.setValue("nationality", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {NATIONALITIES.map((nat) => (
                            <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {seekerForm.formState.errors.nationality && (
                        <p className="text-xs text-destructive">{seekerForm.formState.errors.nationality.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Category</Label>
                      <Select onValueChange={(v) => seekerForm.setValue("preferredCategory", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {JOB_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="seeker-terms"
                      onCheckedChange={(checked) => seekerForm.setValue("terms", checked as boolean)}
                    />
                    <Label htmlFor="seeker-terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  {seekerForm.formState.errors.terms && (
                    <p className="text-xs text-destructive">{seekerForm.formState.errors.terms.message}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : (
                      <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Employer Registration Form */}
              <TabsContent value="employer" className="mt-6">
                <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        placeholder="Your company name"
                        className="pl-9"
                        {...employerForm.register("companyName")}
                      />
                    </div>
                    {employerForm.formState.errors.companyName && (
                      <p className="text-xs text-destructive">{employerForm.formState.errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyEmail"
                          type="email"
                          placeholder="hr@company.com"
                          className="pl-9"
                          {...employerForm.register("companyEmail")}
                        />
                      </div>
                      {employerForm.formState.errors.companyEmail && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.companyEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPersonName">Contact Person *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contactPersonName"
                          placeholder="Contact person name"
                          className="pl-9"
                          {...employerForm.register("contactPersonName")}
                        />
                      </div>
                      {employerForm.formState.errors.contactPersonName && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.contactPersonName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emp-password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="emp-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          className="pl-9 pr-9"
                          {...employerForm.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {employerForm.formState.errors.password && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emp-confirmPassword">Confirm Password *</Label>
                      <Input
                        id="emp-confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        {...employerForm.register("confirmPassword")}
                      />
                      {employerForm.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emp-phone">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="emp-phone"
                          placeholder="+966 XXX XXX XXX"
                          className="pl-9"
                          {...employerForm.register("phone")}
                        />
                      </div>
                      {employerForm.formState.errors.phone && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Industry *</Label>
                      <Select onValueChange={(v) => employerForm.setValue("industry", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {employerForm.formState.errors.industry && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.industry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Region *</Label>
                      <Select onValueChange={(v) => {
                        setSelectedRegion(v)
                        employerForm.setValue("locationRegion", v)
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {REGIONS.map((reg) => (
                            <SelectItem key={reg} value={reg}>{reg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {employerForm.formState.errors.locationRegion && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.locationRegion.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Select 
                        onValueChange={(v) => employerForm.setValue("locationCity", v)}
                        disabled={!selectedRegion}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {employerForm.formState.errors.locationCity && (
                        <p className="text-xs text-destructive">{employerForm.formState.errors.locationCity.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Company Size *</Label>
                    <Select onValueChange={(v) => employerForm.setValue("companySize", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {employerForm.formState.errors.companySize && (
                      <p className="text-xs text-destructive">{employerForm.formState.errors.companySize.message}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="employer-terms"
                      onCheckedChange={(checked) => employerForm.setValue("terms", checked as boolean)}
                    />
                    <Label htmlFor="employer-terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  {employerForm.formState.errors.terms && (
                    <p className="text-xs text-destructive">{employerForm.formState.errors.terms.message}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : (
                      <>Create Employer Account <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
