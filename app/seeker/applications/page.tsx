'use client'

import { motion } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

export default function Applications() {
  const applications = [
    {
      id: '1',
      position: 'Senior React Developer',
      company: 'Tech Solutions Inc',
      location: 'Riyadh, Saudi Arabia',
      salary: '15,000 - 20,000 SAR',
      status: 'pending',
      appliedDate: '2024-05-10',
      type: 'Full-time',
    },
    {
      id: '2',
      position: 'Full Stack Engineer',
      company: 'Innovation Labs',
      location: 'Dubai, UAE',
      salary: '18,000 - 25,000 AED',
      status: 'accepted',
      appliedDate: '2024-05-08',
      type: 'Full-time',
    },
    {
      id: '3',
      position: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'Remote',
      salary: '12,000 - 16,000 SAR',
      status: 'rejected',
      appliedDate: '2024-05-05',
      type: 'Part-time',
    },
    {
      id: '4',
      position: 'Node.js Developer',
      company: 'Software House',
      location: 'Jeddah, Saudi Arabia',
      salary: '14,000 - 18,000 SAR',
      status: 'interview',
      appliedDate: '2024-05-01',
      type: 'Full-time',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'interview':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="seeker" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Applications
              </h1>
              <p className="text-muted-foreground mb-8">
                Track all your job applications in one place
              </p>

              {/* Filter Tabs */}
              <div className="flex gap-4 mb-8 flex-wrap">
                {['All', 'Pending', 'Interview', 'Accepted', 'Rejected'].map(
                  (filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        filter === 'All'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-foreground border border-border hover:bg-accent'
                      }`}
                    >
                      {filter}
                    </motion.button>
                  )
                )}
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Job Info */}
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {app.position}
                        </h3>
                        <p className="text-muted-foreground font-semibold mb-4">
                          {app.company}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin size={16} />
                            {app.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase size={16} />
                            {app.type}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={16} />
                            Applied{' '}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Salary and Status */}
                      <div className="lg:col-span-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Salary Range
                        </p>
                        <p className="font-bold text-primary text-lg">
                          {app.salary}
                        </p>
                      </div>

                      <div className="lg:col-span-1 flex flex-col justify-center lg:items-end">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(app.status)}`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                          View Details
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
