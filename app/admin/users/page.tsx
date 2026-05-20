'use client'

import { motion } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Ban, CheckCircle, Trash2, Edit } from 'lucide-react'

export default function AdminUsers() {
  const users = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      email: 'ahmad@email.com',
      role: 'job_seeker',
      status: 'active',
      joinedDate: '2024-05-01',
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      role: 'employer',
      status: 'active',
      joinedDate: '2024-04-15',
    },
    {
      id: '3',
      name: 'Fatima Al-Rashid',
      email: 'fatima@email.com',
      role: 'job_seeker',
      status: 'suspended',
      joinedDate: '2024-04-20',
    },
    {
      id: '4',
      name: 'Innovation Labs',
      email: 'hello@innovationlabs.com',
      role: 'employer',
      status: 'active',
      joinedDate: '2024-05-05',
    },
    {
      id: '5',
      name: 'Mohammed Saleh',
      email: 'mohammed@email.com',
      role: 'job_seeker',
      status: 'active',
      joinedDate: '2024-05-10',
    },
  ]

  const getRoleColor = (role: string) => {
    return role === 'employer'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800'
  }

  const getRoleLabel = (role: string) => {
    return role === 'employer' ? 'Employer' : 'Job Seeker'
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
                User Management
              </h1>
              <p className="text-muted-foreground mb-8">
                Manage all platform users
              </p>

              {/* Users Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-accent border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Joined
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-accent/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold text-foreground">
                              {user.name}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {user.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}
                            >
                              {getRoleLabel(user.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                user.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-primary hover:text-primary/80"
                              >
                                <Edit size={18} />
                              </motion.button>
                              {user.status === 'active' ? (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  className="text-orange-500 hover:text-orange-600"
                                >
                                  <Ban size={18} />
                                </motion.button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  className="text-green-500 hover:text-green-600"
                                >
                                  <CheckCircle size={18} />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
