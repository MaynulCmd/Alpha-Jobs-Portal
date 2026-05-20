'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { FileText, Heart, Clock, CheckCircle } from 'lucide-react'

export default function SeekerDashboard() {
  const stats = [
    {
      label: 'Applications',
      value: '12',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Saved Jobs',
      value: '28',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'Pending',
      value: '5',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Accepted',
      value: '2',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
  ]

  const recentApplications = [
    {
      id: '1',
      position: 'Senior React Developer',
      company: 'Tech Solutions',
      status: 'pending',
      date: '2024-05-10',
    },
    {
      id: '2',
      position: 'Full Stack Engineer',
      company: 'Innovation Labs',
      status: 'accepted',
      date: '2024-05-08',
    },
    {
      id: '3',
      position: 'Frontend Developer',
      company: 'Digital Agency',
      status: 'rejected',
      date: '2024-05-05',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="seeker" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground mb-8">
                Here&apos;s your job search overview
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm">
                            {stat.label}
                          </p>
                          <p className="text-3xl font-bold text-foreground mt-2">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon size={24} />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link href="/jobs">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Browse Jobs
                  </motion.button>
                </Link>
                <Link href="/seeker/profile">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-secondary text-secondary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    Update Profile
                  </motion.button>
                </Link>
                <Link href="/seeker/cv">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-accent-foreground font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Build CV
                  </motion.button>
                </Link>
              </div>

              {/* Recent Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Applications
                </h2>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {app.position}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {app.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            app.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : app.status === 'accepted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(app.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
