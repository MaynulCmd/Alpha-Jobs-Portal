'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Download, Plus, X } from 'lucide-react'

export default function CVBuilder() {
  const [cvData, setCVData] = useState({
    summary:
      'Experienced full-stack developer with 5+ years of expertise in modern web technologies.',
    experience: [
      {
        id: '1',
        title: 'Senior Developer',
        company: 'Tech Company',
        duration: '2022 - Present',
      },
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Computer Science',
        institution: 'University',
        year: '2019',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'React Advanced',
        issuer: 'Coursera',
      },
    ],
  })

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: Date.now().toString(),
          title: '',
          company: '',
          duration: '',
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="seeker" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-foreground">
                  CV Builder
                </h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90"
                >
                  <Download size={20} />
                  Download CV
                </motion.button>
              </div>

              {/* Professional Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Professional Summary
                </h3>
                <textarea
                  value={cvData.summary}
                  onChange={(e) =>
                    setCVData({ ...cvData, summary: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    Work Experience
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addExperience}
                    className="flex items-center gap-2 text-primary hover:text-primary/80"
                  >
                    <Plus size={20} />
                    Add
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {cvData.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-foreground">
                          Experience {index + 1}
                        </h4>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => {
                            const updatedExp = cvData.experience.map((ex) =>
                              ex.id === exp.id
                                ? { ...ex, title: e.target.value }
                                : ex
                            )
                            setCVData({ ...cvData, experience: updatedExp })
                          }}
                          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const updatedExp = cvData.experience.map((ex) =>
                              ex.id === exp.id
                                ? { ...ex, company: e.target.value }
                                : ex
                            )
                            setCVData({ ...cvData, experience: updatedExp })
                          }}
                          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 2022 - Present)"
                          value={exp.duration}
                          onChange={(e) => {
                            const updatedExp = cvData.experience.map((ex) =>
                              ex.id === exp.id
                                ? { ...ex, duration: e.target.value }
                                : ex
                            )
                            setCVData({ ...cvData, experience: updatedExp })
                          }}
                          className="md:col-span-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Education
                </h3>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border border-border rounded-lg">
                      <p className="font-semibold text-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {edu.institution}
                      </p>
                      <p className="text-muted-foreground text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save CV
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
