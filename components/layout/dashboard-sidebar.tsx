'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User,
  FileText,
  Heart,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const seekerMenuItems = [
  { label: 'Dashboard', href: '/seeker/dashboard', icon: User },
  { label: 'Profile', href: '/seeker/profile', icon: User },
  { label: 'CV Builder', href: '/seeker/cv', icon: FileText },
  { label: 'Applications', href: '/seeker/applications', icon: FileText },
  { label: 'Saved Jobs', href: '/seeker/saved', icon: Heart },
]

const employerMenuItems = [
  { label: 'Dashboard', href: '/employer/dashboard', icon: User },
  { label: 'Company', href: '/employer/company', icon: User },
  { label: 'Post Job', href: '/employer/jobs/new', icon: FileText },
  { label: 'Job Listings', href: '/employer/jobs', icon: FileText },
  { label: 'Applicants', href: '/employer/applicants', icon: Heart },
]

const adminMenuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: User },
  { label: 'Users', href: '/admin/users', icon: User },
  { label: 'Jobs', href: '/admin/jobs', icon: FileText },
  { label: 'Companies', href: '/admin/companies', icon: User },
  { label: 'Settings', href: '/admin/settings', icon: FileText },
]

type DashboardType = 'seeker' | 'employer' | 'admin'

export function DashboardSidebar({ type }: { type: DashboardType }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems =
    type === 'seeker'
      ? seekerMenuItems
      : type === 'employer'
        ? employerMenuItems
        : adminMenuItems

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-40 lg:hidden bg-primary text-primary-foreground p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-background border-r border-border overflow-y-auto transition-transform lg:relative lg:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}

          <motion.button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors mt-8"
            whileHover={{ x: 4 }}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </motion.button>
        </nav>
      </motion.div>
    </>
  )
}
