'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Edit, Trash2, Eye, Users, Plus } from 'lucide-react'

export default function EmployerJobs() {
  const jobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      location: 'Riyadh, Saudi Arabia',
      applicants: 24,
      views: 456,
      status: 'active',
      postedDate: '2024-05-10',
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      location: 'Dubai, UAE',
      applicants: 18,
      views: 389,
      status: 'active',
      postedDate: '2024-05-08',
    },
    {
      id: '3',
      title: 'Frontend Developer',
      location: 'Remote',
      applicants: 31,
      views: 512,
      status: 'active',
      postedDate: '2024-05-05',
    },
    {
      id: '4',
      title: 'Node.js Developer',
      location: 'Jeddah, Saudi Arabia',
      applicants: 12,
      views: 234,
      status: 'closed',
      postedDate: '2024-04-28',
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
                  <h1 className="text-4xl font-bold text-foreground">
                    My Job Postings
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {jobs.length} total jobs
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

              {/* Jobs Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-accent border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Job Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Applicants
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Views
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {jobs.map((job, index) => (
                        <motion.tr
                          key={job.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-accent/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold text-foreground">
                              {job.title}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {job.location}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-primary" />
                              <span className="font-semibold text-foreground">
                                {job.applicants}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Eye size={16} className="text-secondary" />
                              <span className="font-semibold text-foreground">
                                {job.views}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                job.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {job.status.charAt(0).toUpperCase() +
                                job.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-primary hover:text-primary/80"
                              >
                                <Edit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
