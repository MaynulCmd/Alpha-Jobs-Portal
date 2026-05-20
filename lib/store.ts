import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, Job, JobFilters } from './types'

// Auth Store
interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'alpha-jobs-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

// Job Filters Store
interface JobFiltersState {
  filters: JobFilters
  setFilter: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void
  setFilters: (filters: Partial<JobFilters>) => void
  resetFilters: () => void
}

const defaultFilters: JobFilters = {
  keyword: '',
  locationCity: '',
  locationRegion: '',
  categoryId: '',
  employmentType: undefined,
  experienceLevel: undefined,
  salaryMin: undefined,
  salaryMax: undefined,
}

export const useJobFiltersStore = create<JobFiltersState>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}))

// Saved Jobs Store
interface SavedJobsState {
  savedJobIds: string[]
  addSavedJob: (jobId: string) => void
  removeSavedJob: (jobId: string) => void
  isSaved: (jobId: string) => boolean
  setSavedJobs: (jobIds: string[]) => void
}

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      savedJobIds: [],
      addSavedJob: (jobId) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.includes(jobId)
            ? state.savedJobIds
            : [...state.savedJobIds, jobId],
        })),
      removeSavedJob: (jobId) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.filter((id) => id !== jobId),
        })),
      isSaved: (jobId) => get().savedJobIds.includes(jobId),
      setSavedJobs: (jobIds) => set({ savedJobIds: jobIds }),
    }),
    {
      name: 'alpha-jobs-saved',
    }
  )
)

// UI Store
interface UIState {
  isMobileMenuOpen: boolean
  isFilterDrawerOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setFilterDrawerOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  toggleFilterDrawer: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isFilterDrawerOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setFilterDrawerOpen: (open) => set({ isFilterDrawerOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleFilterDrawer: () => set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
}))

// PWA Install Prompt Store
interface PWAState {
  deferredPrompt: BeforeInstallPromptEvent | null
  isInstallable: boolean
  isInstalled: boolean
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void
  setInstalled: (installed: boolean) => void
  promptInstall: () => Promise<boolean>
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const usePWAStore = create<PWAState>((set, get) => ({
  deferredPrompt: null,
  isInstallable: false,
  isInstalled: false,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt, isInstallable: !!prompt }),
  setInstalled: (installed) => set({ isInstalled: installed }),
  promptInstall: async () => {
    const { deferredPrompt } = get()
    if (!deferredPrompt) return false

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    set({ deferredPrompt: null, isInstallable: false })

    if (outcome === 'accepted') {
      set({ isInstalled: true })
      return true
    }
    return false
  },
}))
