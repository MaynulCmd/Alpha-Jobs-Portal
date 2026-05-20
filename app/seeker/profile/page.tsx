'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Camera, Save, Mail, Phone, MapPin } from 'lucide-react'

export default function SeekerProfile() {
  const [formData, setFormData] = useState({
    firstName: 'Mohammad',
    lastName: 'Shaon',
    email: 'redarcopc@gmail.com',
    phone: '+966 50 000 0000',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    title: 'Full Stack Developer',
    bio: 'Experienced developer looking for exciting opportunities',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              <h1 className="text-4xl font-bold text-foreground mb-8">
                My Profile
              </h1>

              {/* Profile Picture Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 mb-8"
              >
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Camera className="text-white" size={48} />
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90">
                      <Camera size={20} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="text-primary font-semibold">
                      {formData.title}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Member since May 2024
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form Section */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Mail size={16} /> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Phone size={16} /> Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MapPin size={16} /> Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Professional Information
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.skills.join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: e.target.value
                            .split(',')
                            .map((s) => s.trim()),
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save size={20} />
                  Save Changes
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
