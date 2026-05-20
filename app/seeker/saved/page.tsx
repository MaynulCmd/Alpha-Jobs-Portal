'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Heart, MapPin, Briefcase, Trash2 } from 'lucide-react'

export default function SavedJobs() {
  const savedJobs = [
    {
      id: '1',
      position: 'Senior React Developer',
      company: 'Tech Solutions',
      location: 'Riyadh, Saudi Arabia',
      salary: '15,000 - 20,000 SAR',
      type: 'Full-time',
      savedDate: '2024-05-15',
    },
    {
      id: '2',
      position: 'Full Stack Engineer',
      company: 'Innovation Labs',
      location: 'Dubai, UAE',
      salary: '18,000 - 25,000 AED',
      type: 'Full-time',
      savedDate: '2024-05-14',
    },
    {
      id: '3',
      position: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'Remote',
      salary: '12,000 - 16,000 SAR',
      type: 'Contract',
      savedDate: '2024-05-13',
    },
    {
      id: '4',
      position: 'Node.js Developer',
      company: 'Software House',
      location: 'Jeddah, Saudi Arabia',
      salary: '14,000 - 18,000 SAR',
      type: 'Full-time',
      savedDate: '2024-05-12',
    },
    {
      id: '5',
      position: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Remote',
      salary: '16,000 - 22,000 SAR',
      type: 'Full-time',
      savedDate: '2024-05-11',
    },
  ]

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
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    Saved Jobs
                  </h1>
                  <p className="text-muted-foreground">
                    {savedJobs.length} jobs saved
                  </p>
                </div>
                <Heart className="text-red-500" size={48} fill="currentColor" />
              </div>

              {/* Grid View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors flex flex-col"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {job.position}
                      </h3>
                      <p className="text-muted-foreground font-semibold mb-4">
                        {job.company}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase size={16} />
                          {job.type}
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Salary Range
                        </p>
                        <p className="font-bold text-primary text-lg">
                          {job.salary}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Link href={`/jobs/${job.id}`} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          View Job
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </motion.button>
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
