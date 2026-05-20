'use client'

import { motion } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Mail, Phone, Download, CheckCircle, XCircle } from 'lucide-react'

export default function Applicants() {
  const applicants = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      email: 'ahmad@email.com',
      phone: '+966 50 123 4567',
      position: 'Senior React Developer',
      status: 'new',
      appliedDate: '2024-05-15',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Fatima Al-Rashid',
      email: 'fatima@email.com',
      phone: '+966 50 234 5678',
      position: 'Full Stack Engineer',
      status: 'reviewing',
      appliedDate: '2024-05-14',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Mohammed Saleh',
      email: 'mohammed@email.com',
      phone: '+966 50 345 6789',
      position: 'DevOps Engineer',
      status: 'shortlisted',
      appliedDate: '2024-05-13',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Nora Ahmed',
      email: 'nora@email.com',
      phone: '+966 50 456 7890',
      position: 'Senior React Developer',
      status: 'interviewed',
      appliedDate: '2024-05-12',
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Samir Ali',
      email: 'samir@email.com',
      phone: '+966 50 567 8901',
      position: 'Full Stack Engineer',
      status: 'rejected',
      appliedDate: '2024-05-11',
      rating: 3.5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shortlisted':
        return 'bg-green-100 text-green-800'
      case 'interviewed':
        return 'bg-purple-100 text-purple-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 > 0 ? '✨' : '')
  }

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
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Applicants
              </h1>
              <p className="text-muted-foreground mb-8">
                Review and manage all your applicants
              </p>

              {/* Applicants Grid */}
              <div className="space-y-4">
                {applicants.map((applicant, index) => (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Applicant Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {applicant.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {applicant.position}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(applicant.status)}`}
                          >
                            {applicant.status
                              .split('-')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Mail size={16} />
                            <a href={`mailto:${applicant.email}`}>
                              {applicant.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Phone size={16} />
                            <a href={`tel:${applicant.phone}`}>
                              {applicant.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="lg:col-span-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Rating
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">
                            {renderStars(applicant.rating)}
                          </span>
                          <span className="text-lg font-bold text-foreground">
                            {applicant.rating}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied{' '}
                          {new Date(applicant.appliedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex flex-col gap-3 lg:justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90"
                        >
                          <Download size={16} />
                          View CV
                        </motion.button>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 font-semibold py-2 px-3 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <XCircle size={16} />
                            Reject
                          </motion.button>
                        </div>
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
