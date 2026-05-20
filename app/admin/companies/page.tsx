'use client'

import { motion } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { CheckCircle, XCircle, Trash2, Eye } from 'lucide-react'

export default function AdminCompanies() {
  const companies = [
    {
      id: '1',
      name: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      status: 'verified',
      joinedDate: '2024-04-15',
      jobs: 8,
    },
    {
      id: '2',
      name: 'Innovation Labs',
      email: 'hello@innovationlabs.com',
      status: 'pending',
      joinedDate: '2024-05-01',
      jobs: 0,
    },
    {
      id: '3',
      name: 'Digital Agency Pro',
      email: 'contact@digitalagency.com',
      status: 'verified',
      joinedDate: '2024-03-20',
      jobs: 5,
    },
    {
      id: '4',
      name: 'Software House',
      email: 'hr@softwarehouse.com',
      status: 'suspended',
      joinedDate: '2024-02-10',
      jobs: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
                Company Management
              </h1>
              <p className="text-muted-foreground mb-8">
                Verify and manage companies
              </p>

              {/* Companies List */}
              <div className="space-y-4">
                {companies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Company Info */}
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {company.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {company.email}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Joined{' '}
                            {new Date(company.joinedDate).toLocaleDateString()}
                          </span>
                          <span className="text-primary font-semibold">
                            {company.jobs} active jobs
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="lg:col-span-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(company.status)}`}
                        >
                          {company.status.charAt(0).toUpperCase() +
                            company.status.slice(1)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex flex-col justify-end gap-3">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold"
                          >
                            <Eye size={16} />
                            View
                          </motion.button>
                          {company.status === 'pending' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg hover:bg-green-200"
                            >
                              <CheckCircle size={16} />
                              Verify
                            </motion.button>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold"
                        >
                          <Trash2 size={16} />
                          Remove
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
