'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react'

export default function EmployerDashboard() {
  const stats = [
    {
      label: 'Active Jobs',
      value: '8',
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Applicants',
      value: '156',
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Profile Views',
      value: '1,234',
      icon: Eye,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Hired',
      value: '12',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const recentApplicants = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      position: 'Senior React Developer',
      status: 'new',
      appliedDate: '2024-05-15',
    },
    {
      id: '2',
      name: 'Fatima Al-Rashid',
      position: 'Full Stack Engineer',
      status: 'reviewing',
      appliedDate: '2024-05-14',
    },
    {
      id: '3',
      name: 'Mohammed Saleh',
      position: 'DevOps Engineer',
      status: 'shortlisted',
      appliedDate: '2024-05-13',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="employer" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    Employer Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your job postings and applicants
                  </p>
                </div>
                <Link href="/employer/jobs/new">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90"
                  >
                    <Plus size={20} />
                    Post New Job
                  </motion.button>
                </Link>
              </div>

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

              {/* Recent Applicants */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-card border border-border rounded-lg p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Recent Applicants
                  </h2>
                  <Link
                    href="/employer/applicants"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    View All
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {applicant.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {applicant.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            applicant.status === 'new'
                              ? 'bg-blue-100 text-blue-800'
                              : applicant.status === 'reviewing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {applicant.status.charAt(0).toUpperCase() +
                            applicant.status.slice(1)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary font-semibold hover:text-primary/80"
                        >
                          Review
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-primary-foreground"
                >
                  <Briefcase size={32} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Manage Jobs</h3>
                  <p className="mb-4 opacity-90">
                    Edit, update, or close your job postings
                  </p>
                  <Link href="/employer/jobs">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Go to Jobs
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-secondary to-secondary/80 rounded-lg p-6 text-secondary-foreground"
                >
                  <Users size={32} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">Update Company</h3>
                  <p className="mb-4 opacity-90">
                    Manage your company profile and details
                  </p>
                  <Link href="/employer/company">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Update Profile
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
