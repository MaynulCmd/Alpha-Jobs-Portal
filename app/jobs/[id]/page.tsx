"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Building2, 
  ExternalLink,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Users,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobCard } from "@/components/cards/job-card"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { useSavedJobsStore, useAuthStore } from "@/lib/store"
import { ROUTES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/constants"
import { mockJobs } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = use(params)
  const job = mockJobs.find(j => j.id === id)
  const { isSaved, addSavedJob, removeSavedJob } = useSavedJobsStore()
  const { user, isAuthenticated } = useAuthStore()

  if (!job) {
    notFound()
  }

  const saved = isSaved(job.id)
  const relatedJobs = mockJobs.filter(j => j.id !== job.id && j.categoryId === job.categoryId).slice(0, 3)

  const handleSaveToggle = () => {
    if (saved) {
      removeSavedJob(job.id)
    } else {
      addSavedJob(job.id)
    }
  }

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return "Competitive"
    const formatter = new Intl.NumberFormat("en-SA")
    if (job.salaryMin && job.salaryMax) {
      return `${formatter.format(job.salaryMin)} - ${formatter.format(job.salaryMax)} ${job.currency}/month`
    }
    if (job.salaryMin) return `From ${formatter.format(job.salaryMin)} ${job.currency}/month`
    if (job.salaryMax) return `Up to ${formatter.format(job.salaryMax)} ${job.currency}/month`
    return "Competitive"
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.employer?.companyName}`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border py-4">
          <div className="container mx-auto max-w-7xl px-4">
            <Link 
              href={ROUTES.jobs} 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header */}
              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-primary" />
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                            {job.title}
                          </h1>
                          <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <span className="font-medium text-foreground">
                              {job.employer?.companyName}
                            </span>
                            {job.employer?.isVerified && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {job.locationCity}, {job.locationRegion}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          {EMPLOYMENT_TYPES[job.employmentType]}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {job.postedAt ? formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }) : "Recently"}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge>{EXPERIENCE_LEVELS[job.experienceLevel]}</Badge>
                        <Badge variant="outline" className="text-primary border-primary">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {formatSalary()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
                    {isAuthenticated && user?.role === "SEEKER" ? (
                      <Button size="lg" className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90">
                        Apply Now
                      </Button>
                    ) : (
                      <Button size="lg" className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <Link href={ROUTES.auth.login}>Sign In to Apply</Link>
                      </Button>
                    )}
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={handleSaveToggle}
                      className={cn(saved && "text-red-500 border-red-500 hover:bg-red-50")}
                    >
                      <Heart className={cn("h-5 w-5 mr-2", saved && "fill-current")} />
                      {saved ? "Saved" : "Save Job"}
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleShare}>
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </FadeInUp>

              {/* Job Description */}
              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="whitespace-pre-line">{job.description}</p>
                  </div>

                  {job.responsibilities && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-lg font-semibold text-foreground mb-4">Responsibilities</h3>
                      <ul className="space-y-2">
                        {job.responsibilities.split('\n').map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {job.requirements && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-lg font-semibold text-foreground mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {job.requirements.split('\n').map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {job.benefits && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-lg font-semibold text-foreground mb-4">Benefits</h3>
                      <ul className="space-y-2">
                        {job.benefits.split('\n').map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </FadeInUp>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Card */}
              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">About the Company</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {job.employer?.companyName}
                        </span>
                        {job.employer?.isVerified && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {job.employer?.industry}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {job.employer?.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.employer?.locationCity}, {job.employer?.locationRegion}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {job.employer?.companySize} employees
                    </div>
                    {job.employer?.website && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <a 
                          href={job.employer.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={ROUTES.companyDetails(job.employer?.id || "")}>
                      View Company Profile
                    </Link>
                  </Button>
                </div>
              </FadeInUp>

              {/* Job Stats */}
              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Posted</span>
                      <span className="text-sm font-medium text-foreground">
                        {job.postedAt ? formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }) : "Recently"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Applications</span>
                      <span className="text-sm font-medium text-foreground">
                        {job.applicationsCount || 0} applicants
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Job Type</span>
                      <span className="text-sm font-medium text-foreground">
                        {EMPLOYMENT_TYPES[job.employmentType]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <span className="text-sm font-medium text-foreground">
                        {EXPERIENCE_LEVELS[job.experienceLevel]}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <section className="mt-12">
              <FadeInUp>
                <h2 className="text-xl font-semibold text-foreground mb-6">Similar Jobs</h2>
              </FadeInUp>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedJobs.map((relatedJob) => (
                  <StaggerItem key={relatedJob.id}>
                    <JobCard job={relatedJob} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
