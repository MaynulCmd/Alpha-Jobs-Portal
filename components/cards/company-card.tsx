"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin, Building2, Users, ExternalLink, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animations"
import { ROUTES } from "@/lib/constants"
import type { EmployerProfile } from "@/lib/types"

interface CompanyCardProps {
  company: EmployerProfile
  jobCount?: number
}

export function CompanyCard({ company, jobCount }: CompanyCardProps) {
  const router = useRouter()
  
  const handleCardClick = () => {
    router.push(ROUTES.companyDetails(company.id))
  }

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (company.website) {
      window.open(company.website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <AnimatedCard>
      <div 
        onClick={handleCardClick}
        className="cursor-pointer p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors h-full flex flex-col"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{company.companyName}</h3>
              {company.isVerified && (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{company.industry}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {company.description || "No description available"}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {company.locationCity}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {company.companySize}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {jobCount !== undefined ? `${jobCount} open positions` : "View jobs"}
          </Badge>
          {company.website && (
            <button 
              onClick={handleWebsiteClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Visit company website"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </AnimatedCard>
  )
}
