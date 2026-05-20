"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Briefcase, 
  Building2, 
  User, 
  LogIn, 
  ChevronDown,
  Sun,
  Moon,
  LayoutDashboard,
  FileText,
  Heart,
  Settings,
  LogOut
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUIStore, useAuthStore } from "@/lib/store"
import { ROUTES } from "@/lib/constants"
import { Logo } from "./logo"

const mainNavItems = [
  { href: ROUTES.jobs, label: "Find Jobs", icon: Briefcase },
  { href: ROUTES.companies, label: "Companies", icon: Building2 },
  { href: ROUTES.about, label: "About", icon: null },
  { href: ROUTES.contact, label: "Contact", icon: null },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { user, isAuthenticated, logout } = useAuthStore()

  const getDashboardRoute = () => {
    if (!user) return ROUTES.auth.login
    switch (user.role) {
      case "ADMIN": return ROUTES.admin.dashboard
      case "EMPLOYER": return ROUTES.employer.dashboard
      default: return ROUTES.seeker.dashboard
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardRoute()}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user.role === "SEEKER" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.seeker.profile}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.seeker.applications}>
                        <FileText className="mr-2 h-4 w-4" />
                        Applications
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.seeker.saved}>
                        <Heart className="mr-2 h-4 w-4" />
                        Saved Jobs
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "EMPLOYER" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.employer.company}>
                        <Building2 className="mr-2 h-4 w-4" />
                        Company Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={ROUTES.employer.jobs}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Manage Jobs
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href={ROUTES.auth.login}>Sign In</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={ROUTES.auth.register}>Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container px-4 py-4 space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href={getDashboardRoute()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={ROUTES.auth.login}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </Link>
                    <Link
                      href={ROUTES.auth.register}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
