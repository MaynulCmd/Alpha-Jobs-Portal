"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  MapPin,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FadeInUp } from "@/components/ui/animations"
import { mockJobs, mockCompanies } from "@/lib/mock-data"
import { JOB_CATEGORIES, REGIONS, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/constants"
import type { Job } from "@/lib/types"

const statusColors = {
  active: "bg-green-500/10 text-green-700 border-green-200",
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  closed: "bg-gray-500/10 text-gray-700 border-gray-200",
  rejected: "bg-red-500/10 text-red-700 border-red-200",
}

const statusIcons = {
  active: CheckCircle2,
  pending: Clock,
  closed: XCircle,
  rejected: XCircle,
}

export default function CreatorJobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer?.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesCategory = categoryFilter === "all" || job.categoryId === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleStatusChange = (jobId: string, newStatus: Job["status"]) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ))
  }

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId))
  }

  return (
    <div className="p-6 lg:p-8">
      <FadeInUp>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Jobs Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage all job listings</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
                <DialogDescription>
                  Create a new job listing. Fill in all required fields.
                </DialogDescription>
              </DialogHeader>
              <JobForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {JOB_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{jobs.length}</div>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{jobs.filter(j => j.status === 'active').length}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{jobs.filter(j => j.status === 'pending').length}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{jobs.filter(j => j.status === 'closed').length}</div>
              <p className="text-sm text-muted-foreground">Closed</p>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => {
                    const StatusIcon = statusIcons[job.status]
                    return (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{job.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {JOB_CATEGORIES.find(c => c.id === job.categoryId)?.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{job.employer?.companyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{job.locationCity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{EMPLOYMENT_TYPES[job.employmentType]}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[job.status]}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditingJob(job)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {job.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'active')}>
                                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'rejected')}>
                                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {job.status === 'active' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'closed')}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Close Job
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
              <DialogDescription>
                Update job listing details.
              </DialogDescription>
            </DialogHeader>
            {editingJob && (
              <JobForm 
                job={editingJob} 
                onClose={() => setEditingJob(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </FadeInUp>
    </div>
  )
}

function JobForm({ job, onClose }: { job?: Job; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    requirements: job?.requirements?.join("\n") || "",
    categoryId: job?.categoryId || "",
    employmentType: job?.employmentType || "full-time",
    experienceLevel: job?.experienceLevel || "mid",
    locationRegion: job?.locationRegion || "",
    locationCity: job?.locationCity || "",
    salaryMin: job?.salaryMin?.toString() || "",
    salaryMax: job?.salaryMax?.toString() || "",
    employerId: job?.employerId || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Job data:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {JOB_CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Select
            value={formData.employerId}
            onValueChange={(value) => setFormData({ ...formData, employerId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {mockCompanies.map((company) => (
                <SelectItem key={company.id} value={company.id}>{company.companyName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            value={formData.employmentType}
            onValueChange={(value) => setFormData({ ...formData, employmentType: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EMPLOYMENT_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(value) => setFormData({ ...formData, experienceLevel: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EXPERIENCE_LEVELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Select
            value={formData.locationRegion}
            onValueChange={(value) => setFormData({ ...formData, locationRegion: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.locationCity}
            onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
            placeholder="e.g. Riyadh"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salaryMin">Min Salary (SAR)</Label>
          <Input
            id="salaryMin"
            type="number"
            value={formData.salaryMin}
            onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
            placeholder="e.g. 10000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salaryMax">Max Salary (SAR)</Label>
          <Input
            id="salaryMax"
            type="number"
            value={formData.salaryMax}
            onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
            placeholder="e.g. 20000"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Job description..."
            rows={4}
            required
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="requirements">Requirements (one per line)</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            placeholder="Enter each requirement on a new line"
            rows={4}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {job ? "Update Job" : "Create Job"}
        </Button>
      </DialogFooter>
    </form>
  )
}
