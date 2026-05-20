'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Camera, Save } from 'lucide-react'

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: 'Tech Solutions Inc',
    email: 'info@techsolutions.com',
    phone: '+966 11 123 4567',
    website: 'www.techsolutions.com',
    location: 'Riyadh, Saudi Arabia',
    industry: 'Technology',
    description: 'Leading tech solutions provider in the Middle East',
    employees: '50-100',
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
              <h1 className="text-4xl font-bold text-foreground mb-8">
                Company Profile
              </h1>

              {/* Company Logo Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 mb-8"
              >
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Camera className="text-white" size={48} />
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90">
                      <Camera size={20} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {formData.companyName}
                    </h2>
                    <p className="text-primary font-semibold">
                      {formData.industry}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {formData.employees} employees
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {/* Basic Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Retail">Retail</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Address & Contact */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Address & Contact
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Company Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:bg-primary/90"
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
