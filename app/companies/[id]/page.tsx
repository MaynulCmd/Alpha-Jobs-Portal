"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  MapPin, 
  Users, 
  Globe, 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobCard } from "@/components/cards/job-card"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { ROUTES } from "@/lib/constants"
import { mockCompanies, mockJobs } from "@/lib/mock-data"

interface CompanyDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
  const { id } = use(params)
  const company = mockCompanies.find(c => c.id === id)

  if (!company) {
    notFound()
  }

  const companyJobs = mockJobs.filter(job => job.employerId === company.id)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border py-4">
          <div className="container mx-auto max-w-7xl px-4">
            <Link 
              href={ROUTES.companies} 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Company Header */}
          <FadeInUp>
            <div className="bg-card rounded-xl border border-border p-6 lg:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                      {company.companyName}
                    </h1>
                    {company.isVerified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-6 max-w-3xl">
                    {company.description}
                  </p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {company.industry}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {company.locationCity}, {company.locationRegion}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      {company.companySize} employees
                    </span>
                    {company.website && (
                      <a 
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe className="h-4 w-4 text-primary" />
                        Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Company Jobs */}
          <section>
            <FadeInUp>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Open Positions ({companyJobs.length})
                </h2>
              </div>
            </FadeInUp>

            {companyJobs.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyJobs.map((job) => (
                  <StaggerItem key={job.id}>
                    <JobCard job={job} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-xl">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No open positions
                </h3>
                <p className="text-muted-foreground mb-4">
                  This company doesn&apos;t have any active job listings at the moment.
                </p>
                <Button variant="outline" asChild>
                  <Link href={ROUTES.jobs}>Browse Other Jobs</Link>
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
