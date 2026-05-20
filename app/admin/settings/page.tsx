'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Save, Upload } from 'lucide-react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'Alpha Jobs',
    tagline: 'Your Gateway to Career Success in the Middle East',
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    accentColor: '#ec4899',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, checked, value } = e.target as HTMLInputElement
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar type="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-8">
                Platform Settings
              </h1>

              <form className="space-y-8">
                {/* General Settings */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    General Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        name="platformName"
                        value={settings.platformName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Platform Tagline
                      </label>
                      <textarea
                        name="tagline"
                        value={settings.tagline}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            name="primaryColor"
                            value={settings.primaryColor}
                            onChange={handleChange}
                            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={handleChange}
                            disabled
                            className="flex-1 px-3 py-2 border border-border rounded-lg bg-accent text-foreground text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Secondary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            name="secondaryColor"
                            value={settings.secondaryColor}
                            onChange={handleChange}
                            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings.secondaryColor}
                            onChange={handleChange}
                            disabled
                            className="flex-1 px-3 py-2 border border-border rounded-lg bg-accent text-foreground text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            name="accentColor"
                            value={settings.accentColor}
                            onChange={handleChange}
                            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings.accentColor}
                            onChange={handleChange}
                            disabled
                            className="flex-1 px-3 py-2 border border-border rounded-lg bg-accent text-foreground text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Feature Toggles */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Feature Toggles
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">
                          Maintenance Mode
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Disable platform access temporarily
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={handleChange}
                        className="w-6 h-6 rounded border-border"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">
                          New Registrations
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Allow new users to register
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="registrationEnabled"
                        checked={settings.registrationEnabled}
                        onChange={handleChange}
                        className="w-6 h-6 rounded border-border"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">
                          Email Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Send system notifications to users
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        className="w-6 h-6 rounded border-border"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Logo Upload */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Branding
                  </h2>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="mx-auto mb-4 text-muted-foreground" size={32} />
                    <p className="font-semibold text-foreground mb-2">
                      Upload Platform Logo
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      PNG, JPG up to 5MB
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      className="bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90"
                    >
                      Choose File
                    </motion.button>
                  </div>
                </motion.div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save size={20} />
                  Save Settings
                </motion.button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
