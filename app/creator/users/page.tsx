"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Shield,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import { FadeInUp } from "@/components/ui/animations"
import { mockSeekers, mockCompanies } from "@/lib/mock-data"
import type { UserRole } from "@/lib/types"

// Combine all users
const allUsers = [
  ...mockSeekers.map(s => ({ ...s, role: 'seeker' as UserRole })),
  ...mockCompanies.map(c => ({ 
    id: c.id, 
    email: c.contactEmail || `contact@${c.companyName.toLowerCase().replace(/\s/g, '')}.com`,
    firstName: c.companyName,
    lastName: '',
    role: 'employer' as UserRole,
    createdAt: c.createdAt,
    isActive: true,
    companyName: c.companyName,
  })),
  {
    id: 'admin1',
    email: 'admin@alphajobs.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'admin' as UserRole,
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: 'creator1',
    email: 'redarcopc@gmail.com',
    firstName: 'Mohammad Maynul Hasan',
    lastName: 'Shaon',
    role: 'creator' as UserRole,
    createdAt: '2024-01-01',
    isActive: true,
  },
]

const roleColors = {
  seeker: "bg-blue-500/10 text-blue-700 border-blue-200",
  employer: "bg-purple-500/10 text-purple-700 border-purple-200",
  admin: "bg-orange-500/10 text-orange-700 border-orange-200",
  creator: "bg-amber-500/10 text-amber-700 border-amber-200",
}

const roleIcons = {
  seeker: User,
  employer: Building2,
  admin: Shield,
  creator: Shield,
}

export default function CreatorUsersPage() {
  const [users, setUsers] = useState(allUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const name = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchesSearch = 
      name.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive)
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ))
  }

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
  }

  return (
    <div className="p-6 lg:p-8">
      <FadeInUp>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
            <p className="text-muted-foreground">Manage all platform users</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account.
                </DialogDescription>
              </DialogHeader>
              <UserForm onClose={() => setIsAddDialogOpen(false)} />
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="seeker">Job Seekers</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="creator">Creators</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'seeker').length}</div>
              <p className="text-sm text-muted-foreground">Seekers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'employer').length}</div>
              <p className="text-sm text-muted-foreground">Employers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{users.filter(u => u.role === 'admin').length}</div>
              <p className="text-sm text-muted-foreground">Admins</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-amber-600">{users.filter(u => u.role === 'creator').length}</div>
              <p className="text-sm text-muted-foreground">Creators</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const RoleIcon = roleIcons[user.role]
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <RoleIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {user.firstName} {user.lastName}
                              </p>
                              {(user as any).companyName && (
                                <p className="text-xs text-muted-foreground">
                                  {(user as any).companyName}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={roleColors[user.role]}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.isActive ? (
                            <Badge className="bg-green-500/10 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-700 border-red-200">
                              <Ban className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
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
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel className="text-xs text-muted-foreground">Change Role</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'seeker')}>
                                <User className="h-4 w-4 mr-2" />
                                Set as Seeker
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'employer')}>
                                <Building2 className="h-4 w-4 mr-2" />
                                Set as Employer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'admin')}>
                                <Shield className="h-4 w-4 mr-2" />
                                Set as Admin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                {user.isActive ? (
                                  <>
                                    <Ban className="h-4 w-4 mr-2 text-red-600" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteUser(user.id)}
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
      </FadeInUp>
    </div>
  )
}

function UserForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "seeker" as UserRole,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("User data:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seeker">Job Seeker</SelectItem>
            <SelectItem value="employer">Employer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="creator">Creator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create User</Button>
      </DialogFooter>
    </form>
  )
}
