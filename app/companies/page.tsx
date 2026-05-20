"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Users, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CompanyCard } from "@/components/cards/company-card"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { INDUSTRIES, REGIONS } from "@/lib/constants"
import { mockCompanies, mockJobs } from "@/lib/mock-data"

export default function CompaniesPage() {
  const [search, setSearch] = useState("")
  const [industry, setIndustry] = useState("")
  const [region, setRegion] = useState("")

  // Get job counts per company
  const companyJobCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    mockJobs.forEach(job => {
      counts[job.employerId] = (counts[job.employerId] || 0) + 1
    })
    return counts
  }, [])

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter(company => {
      const matchesSearch = !search || 
        company.companyName.toLowerCase().includes(search.toLowerCase()) ||
        company.industry.toLowerCase().includes(search.toLowerCase())
      
      const matchesIndustry = !industry || company.industry === industry
      const matchesRegion = !region || company.locationRegion === region

      return matchesSearch && matchesIndustry && matchesRegion
    })
  }, [search, industry, region])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 border-b border-border py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp>
              <h1 className="text-3xl font-bold text-foreground mb-2">Companies</h1>
              <p className="text-muted-foreground">
                Explore top employers hiring across Saudi Arabia
              </p>
            </FadeInUp>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Filters */}
          <FadeInUp>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  {REGIONS.map((reg) => (
                    <SelectItem key={reg} value={reg}>
                      {reg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FadeInUp>

          {/* Stats */}
          <FadeInUp>
            <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {filteredCompanies.length} companies
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {mockJobs.length} open positions
              </span>
            </div>
          </FadeInUp>

          {/* Companies Grid */}
          {filteredCompanies.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies.map((company) => (
                <StaggerItem key={company.id}>
                  <CompanyCard 
                    company={company} 
                    jobCount={companyJobCounts[company.id] || 0}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No companies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
