'use client'

import { motion } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { CheckCircle, XCircle, AlertCircle, Trash2 } from 'lucide-react'

export default function AdminJobs() {
  const jobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'Tech Solutions',
      status: 'approved',
      postedDate: '2024-05-10',
      views: 456,
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'Innovation Labs',
      status: 'pending',
      postedDate: '2024-05-15',
      views: 0,
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      status: 'rejected',
      postedDate: '2024-05-12',
      views: 234,
    },
    {
      id: '4',
      title: 'Node.js Developer',
      company: 'Software House',
      status: 'approved',
      postedDate: '2024-05-08',
      views: 312,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={18} className="text-green-500" />
      case 'pending':
        return <AlertCircle size={18} className="text-yellow-500" />
      case 'rejected':
        return <XCircle size={18} className="text-red-500" />
      default:
        return null
    }
  }

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
                Job Moderation
              </h1>
              <p className="text-muted-foreground mb-8">
                Review and approve job postings
              </p>

              {/* Jobs List */}
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Job Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-3 mb-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {job.company}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Posted{' '}
                          {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="lg:col-span-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            job.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex flex-col justify-end gap-3">
                        {job.status === 'pending' && (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg hover:bg-green-200"
                            >
                              <CheckCircle size={16} />
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 font-semibold py-2 px-3 rounded-lg hover:bg-red-200"
                            >
                              <XCircle size={16} />
                              Reject
                            </motion.button>
                          </div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold"
                        >
                          <Trash2 size={18} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
