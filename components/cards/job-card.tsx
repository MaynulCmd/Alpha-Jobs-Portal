"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Briefcase, Clock, Heart, Building2, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedCard } from "@/components/ui/animations"
import { useSavedJobsStore } from "@/lib/store"
import { ROUTES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/constants"
import type { Job } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface JobCardProps {
  job: Job
  variant?: "default" | "compact" | "featured"
}

export function JobCard({ job, variant = "default" }: JobCardProps) {
  const { isSaved, addSavedJob, removeSavedJob } = useSavedJobsStore()
  const saved = isSaved(job.id)

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (saved) {
      removeSavedJob(job.id)
    } else {
      addSavedJob(job.id)
    }
  }

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null
    const formatter = new Intl.NumberFormat("en-SA", { 
      notation: "compact",
      maximumFractionDigits: 1 
    })
    if (job.salaryMin && job.salaryMax) {
      return `${formatter.format(job.salaryMin)} - ${formatter.format(job.salaryMax)} ${job.currency}`
    }
    if (job.salaryMin) return `From ${formatter.format(job.salaryMin)} ${job.currency}`
    if (job.salaryMax) return `Up to ${formatter.format(job.salaryMax)} ${job.currency}`
  }

  if (variant === "compact") {
    return (
      <Link href={ROUTES.jobDetails(job.id)}>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {job.employer?.companyName} • {job.locationCity}
            </p>
          </div>
          <Badge variant="secondary" className="flex-shrink-0">
            {EMPLOYMENT_TYPES[job.employmentType]}
          </Badge>
        </div>
      </Link>
    )
  }

  return (
    <AnimatedCard>
      <Link href={ROUTES.jobDetails(job.id)} className="block">
        <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.employer?.companyName}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex-shrink-0 rounded-full",
                saved && "text-red-500 hover:text-red-600"
              )}
              onClick={handleSaveToggle}
            >
              <Heart className={cn("h-5 w-5", saved && "fill-current")} />
              <span className="sr-only">{saved ? "Remove from saved" : "Save job"}</span>
            </Button>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.locationCity}, {job.locationRegion}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {EMPLOYMENT_TYPES[job.employmentType]}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {EXPERIENCE_LEVELS[job.experienceLevel]}
            </Badge>
            {job.employer?.isVerified && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                Verified
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            {formatSalary() ? (
              <span className="flex items-center gap-1 text-sm font-medium text-primary">
                <DollarSign className="h-4 w-4" />
                {formatSalary()}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Salary not disclosed</span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {job.postedAt ? formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }) : "Recently"}
            </span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  )
}
