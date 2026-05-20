// Constants for Alpha Jobs

export const REGIONS = [
  'Riyadh',
  'Makkah',
  'Madinah',
  'Eastern Province',
  'Asir',
  'Tabuk',
  'Hail',
  'Northern Borders',
  'Jazan',
  'Najran',
  'Al-Bahah',
  'Al-Jawf',
  'Qassim',
] as const

export const CITIES = {
  'Riyadh': ['Riyadh', 'Diriyah', 'Al Kharj', 'Dawadmi', 'Wadi ad-Dawasir'],
  'Makkah': ['Makkah', 'Jeddah', 'Taif', 'Rabigh'],
  'Madinah': ['Madinah', 'Yanbu', 'Al-Ula'],
  'Eastern Province': ['Dammam', 'Dhahran', 'Khobar', 'Jubail', 'Qatif', 'Al-Ahsa', 'Hafar Al-Batin'],
  'Asir': ['Abha', 'Khamis Mushait', 'Bisha'],
  'Tabuk': ['Tabuk', 'Duba', 'Haql', 'NEOM'],
  'Hail': ['Hail'],
  'Northern Borders': ['Arar', 'Rafha'],
  'Jazan': ['Jazan', 'Sabya', 'Abu Arish'],
  'Najran': ['Najran', 'Sharurah'],
  'Al-Bahah': ['Al Bahah', 'Baljurashi'],
  'Al-Jawf': ['Sakakah', 'Dumat Al-Jandal'],
  'Qassim': ['Buraydah', 'Unayzah', 'Ar Rass'],
} as const

export const JOB_CATEGORIES = [
  { id: 'it', name: 'Information Technology', slug: 'it', icon: 'Monitor' },
  { id: 'construction', name: 'Construction & Engineering', slug: 'construction', icon: 'HardHat' },
  { id: 'healthcare', name: 'Healthcare & Medical', slug: 'healthcare', icon: 'Stethoscope' },
  { id: 'finance', name: 'Finance & Accounting', slug: 'finance', icon: 'Landmark' },
  { id: 'sales', name: 'Sales & Marketing', slug: 'sales', icon: 'TrendingUp' },
  { id: 'hospitality', name: 'Hospitality & Tourism', slug: 'hospitality', icon: 'Hotel' },
  { id: 'education', name: 'Education & Training', slug: 'education', icon: 'GraduationCap' },
  { id: 'manufacturing', name: 'Manufacturing & Production', slug: 'manufacturing', icon: 'Factory' },
  { id: 'retail', name: 'Retail & Consumer', slug: 'retail', icon: 'ShoppingBag' },
  { id: 'logistics', name: 'Logistics & Transportation', slug: 'logistics', icon: 'Truck' },
  { id: 'oil-gas', name: 'Oil & Gas', slug: 'oil-gas', icon: 'Droplet' },
  { id: 'real-estate', name: 'Real Estate', slug: 'real-estate', icon: 'Building2' },
  { id: 'hr', name: 'Human Resources', slug: 'hr', icon: 'Users' },
  { id: 'legal', name: 'Legal', slug: 'legal', icon: 'Scale' },
  { id: 'admin', name: 'Administration', slug: 'admin', icon: 'Briefcase' },
  { id: 'other', name: 'Other', slug: 'other', icon: 'MoreHorizontal' },
] as const

export const EMPLOYMENT_TYPES = {
  'FULL_TIME': 'Full Time',
  'PART_TIME': 'Part Time',
  'CONTRACT': 'Contract',
  'INTERNSHIP': 'Internship',
  'REMOTE': 'Remote',
} as const

export const EXPERIENCE_LEVELS = {
  'ENTRY': 'Entry Level',
  'JUNIOR': 'Junior (1-2 years)',
  'MID': 'Mid-Level (3-5 years)',
  'SENIOR': 'Senior (5-10 years)',
  'EXECUTIVE': 'Executive (10+ years)',
} as const

export const APPLICATION_STATUSES = {
  'SUBMITTED': { label: 'Submitted', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  'VIEWED': { label: 'Viewed', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  'SHORTLISTED': { label: 'Shortlisted', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  'REJECTED': { label: 'Rejected', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  'HIRED': { label: 'Hired', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' },
} as const

export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
] as const

export const INDUSTRIES = [
  'Information Technology',
  'Construction & Engineering',
  'Healthcare',
  'Finance & Banking',
  'Oil & Gas',
  'Manufacturing',
  'Retail & E-commerce',
  'Education',
  'Hospitality & Tourism',
  'Real Estate',
  'Logistics & Transportation',
  'Telecommunications',
  'Government',
  'Non-profit',
  'Consulting',
  'Other',
] as const

export const NATIONALITIES = [
  'Saudi Arabian',
  'Bangladeshi',
  'Egyptian',
  'Filipino',
  'Indian',
  'Indonesian',
  'Jordanian',
  'Lebanese',
  'Malaysian',
  'Moroccan',
  'Nepalese',
  'Pakistani',
  'Palestinian',
  'Sri Lankan',
  'Sudanese',
  'Syrian',
  'Tunisian',
  'Turkish',
  'Yemeni',
  'Other',
] as const

export const LANGUAGE_PROFICIENCIES = [
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native',
] as const

export const VISA_STATUSES = [
  'Transferable',
  'Non-transferable',
  'Visit Visa',
  'Not applicable',
] as const

export const CONTACT_INFO = {
  creator: 'Mohammad Maynul Hasan Shaon',
  email: 'redarcopc@gmail.com',
  location: 'Riyadh, Kingdom of Saudi Arabia',
  company: 'EAY Quantum Technology',
  brand: 'Alpha Ultimate Ltd.',
} as const

// Routes
export const ROUTES = {
  home: '/',
  jobs: '/jobs',
  jobDetails: (id: string) => `/jobs/${id}`,
  companies: '/companies',
  companyDetails: (id: string) => `/companies/${id}`,
  about: '/about',
  contact: '/contact',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  seeker: {
    dashboard: '/seeker/dashboard',
    profile: '/seeker/profile',
    cvBuilder: '/seeker/cv-builder',
    applications: '/seeker/applications',
    saved: '/seeker/saved',
  },
  employer: {
    dashboard: '/employer/dashboard',
    company: '/employer/company',
    jobs: '/employer/jobs',
    newJob: '/employer/jobs/new',
    editJob: (id: string) => `/employer/jobs/${id}/edit`,
    applicants: (id: string) => `/employer/jobs/${id}/applicants`,
  },
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    jobs: '/admin/jobs',
    companies: '/admin/companies',
    branding: '/admin/branding',
    pages: '/admin/pages',
  },
} as const
