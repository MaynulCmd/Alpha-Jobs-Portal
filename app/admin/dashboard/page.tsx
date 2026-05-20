'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Users, Briefcase, Building2, TrendingUp, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Jobs',
      value: '456',
      icon: Briefcase,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Companies',
      value: '89',
      icon: Building2,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Active Now',
      value: '234',
      icon: Activity,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const recentActivity = [
    {
      id: '1',
      action: 'New user registered',
      user: 'Ahmad Hassan',
      time: '5 minutes ago',
    },
    {
      id: '2',
      action: 'Job posted',
      user: 'Tech Solutions Inc',
      time: '15 minutes ago',
    },
    {
      id: '3',
      action: 'Company added',
      user: 'Innovation Labs',
      time: '1 hour ago',
    },
    {
      id: '4',
      action: 'User verified',
      user: 'Fatima Al-Rashid',
      time: '2 hours ago',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mb-8">
                Platform overview and management
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2 bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <div>
                            <p className="font-semibold text-foreground">
                              {activity.action}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.user}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Link href="/admin/users">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-left"
                      >
                        Manage Users
                      </motion.button>
                    </Link>
                    <Link href="/admin/jobs">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors text-left"
                      >
                        Moderate Jobs
                      </motion.button>
                    </Link>
                    <Link href="/admin/companies">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-accent text-accent-foreground font-semibold py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors text-left"
                      >
                        Verify Companies
                      </motion.button>
                    </Link>
                    <Link href="/admin/settings">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-card text-foreground font-semibold py-2 px-4 rounded-lg border border-border hover:bg-accent transition-colors text-left"
                      >
                        Platform Settings
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
