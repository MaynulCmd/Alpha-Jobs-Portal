// Type definitions for Alpha Jobs

export type UserRole = 'SEEKER' | 'EMPLOYER' | 'ADMIN'

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED'

export type ApplicationStatus = 'SUBMITTED' | 'VIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED'

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE'

export type ExperienceLevel = 'ENTRY' | 'JUNIOR' | 'MID' | 'SENIOR' | 'EXECUTIVE'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SeekerProfile {
  id: string
  userId: string
  city?: string
  nationality?: string
  visaStatus?: string
  iqamaStatus?: string
  summary?: string
  skills: string[]
  languages: { name: string; proficiency: string }[]
  profileCvUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface EmployerProfile {
  id: string
  userId: string
  companyName: string
  companyLogoUrl?: string
  industry: string
  companySize: string
  website?: string
  locationCity: string
  locationRegion: string
  description?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface JobCategory {
  id: string
  name: string
  slug: string
  icon?: string
  jobCount?: number
}

export interface Job {
  id: string
  employerId: string
  employer?: EmployerProfile
  title: string
  locationCity: string
  locationRegion: string
  employmentType: EmploymentType
  salaryMin?: number
  salaryMax?: number
  currency: string
  experienceLevel: ExperienceLevel
  categoryId: string
  category?: JobCategory
  description: string
  responsibilities?: string
  requirements?: string
  benefits?: string
  applicationEmail?: string
  applicationLink?: string
  status: JobStatus
  postedAt?: Date
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
  applicationsCount?: number
  isSaved?: boolean
}

export interface JobApplication {
  id: string
  jobId: string
  job?: Job
  seekerId: string
  seeker?: SeekerProfile & { user?: User }
  status: ApplicationStatus
  cvUrl?: string
  coverLetter?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface SavedJob {
  id: string
  seekerId: string
  jobId: string
  job?: Job
  createdAt: Date
}

export interface BrandingAsset {
  id: string
  type: 'LOGO' | 'HERO_IMAGE' | 'BANNER' | 'ICON'
  name: string
  fileUrl: string
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface StaticPage {
  id: string
  slug: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// CV Builder Types
export interface WorkExperience {
  id: string
  jobTitle: string
  companyName: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  startYear: string
  endYear?: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  url?: string
}

export interface Project {
  id: string
  name: string
  description?: string
  url?: string
}

export interface CVData {
  personalDetails: {
    fullName: string
    email: string
    phone: string
    city: string
    nationality: string
  }
  summary: string
  experiences: WorkExperience[]
  education: Education[]
  skills: string[]
  languages: { name: string; proficiency: string }[]
  certifications: Certification[]
  projects: Project[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter Types
export interface JobFilters {
  keyword?: string
  locationCity?: string
  locationRegion?: string
  categoryId?: string
  employmentType?: EmploymentType
  experienceLevel?: ExperienceLevel
  salaryMin?: number
  salaryMax?: number
  status?: JobStatus
}

// Auth Types
export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterSeekerData {
  fullName: string
  email: string
  password: string
  phone: string
  city: string
  nationality: string
  preferredCategory?: string
}

export interface RegisterEmployerData {
  companyName: string
  companyEmail: string
  password: string
  contactPersonName: string
  phone: string
  locationCity: string
  locationRegion: string
  industry: string
  companySize: string
}
