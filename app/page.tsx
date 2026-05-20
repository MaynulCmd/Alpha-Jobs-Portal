"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Search, MapPin, Briefcase, ArrowRight, Building2, Users, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobCard } from "@/components/cards/job-card"
import { CompanyCard } from "@/components/cards/company-card"
import { FadeInUp, StaggerContainer, StaggerItem, FloatingCircles } from "@/components/ui/animations"
import { ROUTES, JOB_CATEGORIES } from "@/lib/constants"
import { mockJobs, mockCompanies } from "@/lib/mock-data"

const stats = [
  { label: "Active Jobs", value: "10,000+", icon: Briefcase },
  { label: "Companies", value: "2,500+", icon: Building2 },
  { label: "Job Seekers", value: "50,000+", icon: Users },
  { label: "Placements", value: "15,000+", icon: CheckCircle2 },
]

const howItWorks = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Sign up and build your professional profile or CV in minutes.",
    icon: Users,
  },
  {
    step: 2,
    title: "Browse Opportunities",
    description: "Search thousands of jobs across Saudi Arabia tailored to your skills.",
    icon: Search,
  },
  {
    step: 3,
    title: "Apply with Ease",
    description: "Submit applications with one click and track your progress.",
    icon: CheckCircle2,
  },
  {
    step: 4,
    title: "Get Hired",
    description: "Connect with employers and land your dream job in KSA.",
    icon: Sparkles,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-16 lg:py-24">
          <FloatingCircles />
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <FadeInUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  Saudi Arabia&apos;s Leading Job Portal
                </span>
              </FadeInUp>
              
              <FadeInUp>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
                  Find Your Next
                  <span className="text-primary block sm:inline"> Dream Job </span>
                  in Saudi Arabia
                </h1>
              </FadeInUp>
              
              <FadeInUp>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                  Smart, fast, and tailored to the KSA job market. Connect with top employers across construction, IT, healthcare, and more.
                </p>
              </FadeInUp>

              {/* Search Bar */}
              <FadeInUp>
                <div className="bg-card rounded-2xl p-3 shadow-lg border border-border max-w-3xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Job title, keywords, or company" 
                        className="pl-10 h-12 border-0 bg-muted/50"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="City or region" 
                        className="pl-10 h-12 border-0 bg-muted/50"
                      />
                    </div>
                    <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href={ROUTES.jobs}>
                        Search Jobs
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeInUp>

              {/* Quick Links */}
              <FadeInUp>
                <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm">
                  <span className="text-muted-foreground">Popular:</span>
                  {["Software Engineer", "Project Manager", "Civil Engineer", "Accountant"].map((term) => (
                    <Link 
                      key={term}
                      href={`${ROUTES.jobs}?keyword=${encodeURIComponent(term)}`}
                      className="px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto max-w-7xl px-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center p-6 rounded-xl bg-card border border-border">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Featured Jobs</h2>
                <p className="text-muted-foreground">Discover the latest opportunities from top employers</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={ROUTES.jobs} className="gap-2">
                  View All Jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJobs.slice(0, 6).map((job) => (
                <StaggerItem key={job.id}>
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find opportunities across all major industries in Saudi Arabia
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {JOB_CATEGORIES.slice(0, 12).map((category) => (
                <StaggerItem key={category.id}>
                  <Link
                    href={`${ROUTES.jobs}?category=${category.slug}`}
                    className="flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">{category.name}</span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Top Companies */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Top Companies Hiring</h2>
                <p className="text-muted-foreground">Join industry leaders shaping Saudi Arabia&apos;s future</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={ROUTES.companies} className="gap-2">
                  View All Companies <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCompanies.slice(0, 4).map((company) => (
                <StaggerItem key={company.id}>
                  <CompanyCard company={company} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your journey to a new career in just four simple steps
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <StaggerItem key={item.step}>
                  <div className="relative">
                    {/* Connector Line */}
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
                    )}
                    
                    <div className="relative text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                        <item.icon className="h-8 w-8 text-primary" />
                        <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Take the Next Step?
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you&apos;re looking for your dream job or seeking top talent, Alpha Jobs connects you with the best opportunities in Saudi Arabia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href={ROUTES.auth.register}>
                    Create Free Account
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={ROUTES.jobs}>
                    Browse Jobs
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
