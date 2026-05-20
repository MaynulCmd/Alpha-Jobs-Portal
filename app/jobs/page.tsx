"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Filter, X, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobCard } from "@/components/cards/job-card"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { useJobFiltersStore } from "@/lib/store"
import { 
  JOB_CATEGORIES, 
  REGIONS, 
  EMPLOYMENT_TYPES, 
  EXPERIENCE_LEVELS 
} from "@/lib/constants"
import { mockJobs } from "@/lib/mock-data"
import type { EmploymentType, ExperienceLevel } from "@/lib/types"

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "salary-high", label: "Highest Salary" },
  { value: "salary-low", label: "Lowest Salary" },
]

export default function JobsPage() {
  const { filters, setFilter, setFilters, resetFilters } = useJobFiltersStore()
  const [sortBy, setSortBy] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...mockJobs]

    // Apply filters
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.employer?.companyName.toLowerCase().includes(keyword)
      )
    }

    if (filters.locationRegion) {
      result = result.filter(job => job.locationRegion === filters.locationRegion)
    }

    if (filters.categoryId) {
      result = result.filter(job => job.categoryId === filters.categoryId)
    }

    if (filters.employmentType) {
      result = result.filter(job => job.employmentType === filters.employmentType)
    }

    if (filters.experienceLevel) {
      result = result.filter(job => job.experienceLevel === filters.experienceLevel)
    }

    if (filters.salaryMin) {
      result = result.filter(job => (job.salaryMax || 0) >= filters.salaryMin!)
    }

    // Apply sorting
    switch (sortBy) {
      case "salary-high":
        result.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0))
        break
      case "salary-low":
        result.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0))
        break
      case "newest":
      default:
        result.sort((a, b) => 
          new Date(b.postedAt || b.createdAt).getTime() - 
          new Date(a.postedAt || a.createdAt).getTime()
        )
    }

    return result
  }, [filters, sortBy])

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== "").length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Keyword */}
      <div className="space-y-2">
        <Label>Keyword</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Job title or keyword"
            value={filters.keyword || ""}
            onChange={(e) => setFilter("keyword", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <Label>Region</Label>
        <Select
          value={filters.locationRegion || "all"}
          onValueChange={(value) => setFilter("locationRegion", value === "all" ? undefined : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.categoryId || "all"}
          onValueChange={(value) => setFilter("categoryId", value === "all" ? undefined : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {JOB_CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employment Type */}
      <div className="space-y-2">
        <Label>Job Type</Label>
        <Select
          value={filters.employmentType || "all"}
          onValueChange={(value) => setFilter("employmentType", value === "all" ? undefined : value as EmploymentType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {Object.entries(EMPLOYMENT_TYPES).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <Label>Experience Level</Label>
        <Select
          value={filters.experienceLevel || "all"}
          onValueChange={(value) => setFilter("experienceLevel", value === "all" ? undefined : value as ExperienceLevel)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {Object.entries(EXPERIENCE_LEVELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Salary */}
      <div className="space-y-2">
        <Label>Minimum Salary (SAR)</Label>
        <Input
          type="number"
          placeholder="e.g. 10000"
          value={filters.salaryMin || ""}
          onChange={(e) => setFilter("salaryMin", e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 border-b border-border py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp>
              <h1 className="text-3xl font-bold text-foreground mb-2">Find Jobs</h1>
              <p className="text-muted-foreground">
                Discover {mockJobs.length}+ job opportunities across Saudi Arabia
              </p>
            </FadeInUp>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </h2>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Bar */}
              <div className="flex items-center gap-3 mb-6 lg:hidden">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down your job search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Desktop Sort Bar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.keyword && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.keyword}
                      <button onClick={() => setFilter("keyword", "")}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.locationRegion && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.locationRegion}
                      <button onClick={() => setFilter("locationRegion", undefined)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.categoryId && (
                    <Badge variant="secondary" className="gap-1">
                      {JOB_CATEGORIES.find(c => c.id === filters.categoryId)?.name}
                      <button onClick={() => setFilter("categoryId", undefined)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.employmentType && (
                    <Badge variant="secondary" className="gap-1">
                      {EMPLOYMENT_TYPES[filters.employmentType]}
                      <button onClick={() => setFilter("employmentType", undefined)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.experienceLevel && (
                    <Badge variant="secondary" className="gap-1">
                      {EXPERIENCE_LEVELS[filters.experienceLevel]}
                      <button onClick={() => setFilter("experienceLevel", undefined)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Jobs Grid */}
              {filteredJobs.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <StaggerItem key={job.id}>
                      <JobCard job={job} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
