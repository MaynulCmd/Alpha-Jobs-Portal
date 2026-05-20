"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  FileText,
  Settings,
  Palette,
  Menu,
  X,
  ChevronRight,
  Shield,
  Globe,
  Mail,
  Bell,
  Database,
  BarChart3,
  MessageSquare,
  Tags,
  Megaphone,
  Crown,
} from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const creatorNavItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/creator/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/creator/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content Management",
    items: [
      { name: "Jobs", href: "/creator/jobs", icon: Briefcase },
      { name: "Companies", href: "/creator/companies", icon: Building2 },
      { name: "Categories", href: "/creator/categories", icon: Tags },
      { name: "Regions", href: "/creator/regions", icon: Globe },
    ],
  },
  {
    title: "User Management",
    items: [
      { name: "All Users", href: "/creator/users", icon: Users },
      { name: "Job Seekers", href: "/creator/users/seekers", icon: FileText },
      { name: "Employers", href: "/creator/users/employers", icon: Building2 },
      { name: "Admins", href: "/creator/users/admins", icon: Shield },
    ],
  },
  {
    title: "Communication",
    items: [
      { name: "Applications", href: "/creator/applications", icon: FileText },
      { name: "Messages", href: "/creator/messages", icon: MessageSquare },
      { name: "Notifications", href: "/creator/notifications", icon: Bell },
      { name: "Email Templates", href: "/creator/emails", icon: Mail },
    ],
  },
  {
    title: "System Configuration",
    items: [
      { name: "Branding", href: "/creator/branding", icon: Palette },
      { name: "Site Settings", href: "/creator/settings", icon: Settings },
      { name: "Announcements", href: "/creator/announcements", icon: Megaphone },
      { name: "Database", href: "/creator/database", icon: Database },
    ],
  },
]

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo size="sm" />
          </div>
          <Badge variant="default" className="bg-amber-500 text-black">
            <Crown className="h-3 w-3 mr-1" />
            Creator
          </Badge>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Logo size="sm" />
                  <Badge variant="default" className="bg-amber-500 text-black">
                    <Crown className="h-3 w-3 mr-1" />
                    Creator
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-65px)]">
                <SidebarContent pathname={pathname} onNavigate={() => setSidebarOpen(false)} />
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:border-r lg:border-border lg:bg-background">
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <Logo size="sm" />
          <Badge variant="default" className="bg-amber-500 text-black">
            <Crown className="h-3 w-3 mr-1" />
            Creator
          </Badge>
        </div>
        <ScrollArea className="h-[calc(100vh-65px)]">
          <SidebarContent pathname={pathname} />
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

function SidebarContent({ 
  pathname, 
  onNavigate 
}: { 
  pathname: string
  onNavigate?: () => void 
}) {
  return (
    <nav className="p-4 space-y-6">
      {creatorNavItems.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            {group.title}
          </h3>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                    {isActive && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Globe className="h-4 w-4" />
          View Live Site
        </Link>
      </div>
    </nav>
  )
}
