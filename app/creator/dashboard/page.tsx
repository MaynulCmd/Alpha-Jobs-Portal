"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Plus,
  ArrowUpRight,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { mockJobs, mockCompanies, mockApplications, mockSeekers } from "@/lib/mock-data"

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Jobs",
    value: mockJobs.length.toString(),
    change: "+8.2%",
    trend: "up",
    icon: Briefcase,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Companies",
    value: mockCompanies.length.toString(),
    change: "+5.1%",
    trend: "up",
    icon: Building2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Applications",
    value: mockApplications.length.toString(),
    change: "-2.3%",
    trend: "down",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const recentActivities = [
  { type: "user_registered", message: "New user registered: Ahmed Al-Farsi", time: "2 min ago", icon: Users },
  { type: "job_posted", message: "New job posted: Senior Developer at Aramco", time: "15 min ago", icon: Briefcase },
  { type: "application", message: "New application for Marketing Manager", time: "32 min ago", icon: FileText },
  { type: "company_verified", message: "Company verified: STC Solutions", time: "1 hour ago", icon: CheckCircle2 },
  { type: "job_expired", message: "Job expired: Data Analyst at SABIC", time: "2 hours ago", icon: Clock },
]

const quickActions = [
  { name: "Add New Job", href: "/creator/jobs/new", icon: Briefcase },
  { name: "Add Company", href: "/creator/companies/new", icon: Building2 },
  { name: "Add User", href: "/creator/users/new", icon: Users },
  { name: "View Reports", href: "/creator/analytics", icon: Activity },
]

export default function CreatorDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <FadeInUp>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Creator Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Full system control and management
            </p>
          </div>
          <div className="flex gap-2">
            {quickActions.slice(0, 2).map((action) => (
              <Link key={action.name} href={action.href}>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{action.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.title}>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 rounded-full bg-primary/10">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/creator/analytics">
                <Button variant="outline" className="w-full mt-4 gap-2">
                  View All Activity
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.name} href={action.href}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <action.icon className="h-4 w-4" />
                    {action.name}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pending Items */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Pending Jobs</CardTitle>
                <Badge variant="secondary">
                  {mockJobs.filter(j => j.status === 'pending').length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockJobs.filter(j => j.status === 'pending').slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm truncate flex-1">{job.title}</span>
                    <Badge variant="outline" className="ml-2 text-yellow-600 border-yellow-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/creator/jobs?status=pending">
                <Button variant="link" className="px-0 mt-2">Review all pending jobs</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Unverified Companies</CardTitle>
                <Badge variant="secondary">
                  {mockCompanies.filter(c => !c.isVerified).length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockCompanies.filter(c => !c.isVerified).slice(0, 3).map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm truncate flex-1">{company.companyName}</span>
                    <Badge variant="outline" className="ml-2 text-orange-600 border-orange-600">
                      <XCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/creator/companies?verified=false">
                <Button variant="link" className="px-0 mt-2">Verify companies</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">New Applications</CardTitle>
                <Badge variant="secondary">
                  {mockApplications.filter(a => a.status === 'pending').length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockApplications.filter(a => a.status === 'pending').slice(0, 3).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm truncate flex-1">Application #{app.id}</span>
                    <Badge variant="outline" className="ml-2 text-blue-600 border-blue-600">
                      <Clock className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/creator/applications">
                <Button variant="link" className="px-0 mt-2">View all applications</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </FadeInUp>
    </div>
  )
}
