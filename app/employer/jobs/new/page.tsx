'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Send } from 'lucide-react'

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    category: '',
    experience: '',
    requirements: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="employer" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Post a New Job
              </h1>
              <p className="text-muted-foreground mb-8">
                Fill in the details below to post a new job opening
              </p>

              <form className="space-y-8">
                {/* Basic Information */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Senior React Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Job Type
                      </label>
                      <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Riyadh, Saudi Arabia"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 15,000 - 20,000 SAR"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Job Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Category</option>
                        <option value="tech">Technology</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="hr">HR</option>
                        <option value="finance">Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Experience Level
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Level</option>
                        <option value="entry">Entry Level</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid-level</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Lead</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Job Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Describe the job role, responsibilities, and what you're looking for..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="List required skills, qualifications, and experience..."
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send size={20} />
                  Post Job
                </motion.button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
