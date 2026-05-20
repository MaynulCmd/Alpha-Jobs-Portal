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
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
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
import { Textarea } from "@/components/ui/textarea"
import { FadeInUp } from "@/components/ui/animations"
import { mockCompanies } from "@/lib/mock-data"
import { REGIONS, INDUSTRIES } from "@/lib/constants"
import type { EmployerProfile } from "@/lib/types"

export default function CreatorCompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [searchQuery, setSearchQuery] = useState("")
  const [verifiedFilter, setVerifiedFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<EmployerProfile | null>(null)

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVerified = verifiedFilter === "all" || 
      (verifiedFilter === "verified" && company.isVerified) ||
      (verifiedFilter === "unverified" && !company.isVerified)
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter
    return matchesSearch && matchesVerified && matchesIndustry
  })

  const handleVerifyCompany = (companyId: string) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, isVerified: true } : c
    ))
  }

  const handleUnverifyCompany = (companyId: string) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, isVerified: false } : c
    ))
  }

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(companies.filter(c => c.id !== companyId))
  }

  return (
    <div className="p-6 lg:p-8">
      <FadeInUp>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Companies Management</h1>
            <p className="text-muted-foreground">Manage and verify company profiles</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>
                  Create a new company profile.
                </DialogDescription>
              </DialogHeader>
              <CompanyForm onClose={() => setIsAddDialogOpen(false)} />
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
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Verified" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{companies.length}</div>
              <p className="text-sm text-muted-foreground">Total Companies</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{companies.filter(c => c.isVerified).length}</div>
              <p className="text-sm text-muted-foreground">Verified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{companies.filter(c => !c.isVerified).length}</div>
              <p className="text-sm text-muted-foreground">Unverified</p>
            </CardContent>
          </Card>
        </div>

        {/* Companies Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{company.companyName}</p>
                            {company.website && (
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                              >
                                <Globe className="h-3 w-3" />
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{company.industry}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {company.locationCity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          {company.companySize}
                        </div>
                      </TableCell>
                      <TableCell>
                        {company.isVerified ? (
                          <Badge className="bg-green-500/10 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-500/10 text-orange-700 border-orange-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          {company.contactEmail && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">{company.contactEmail}</span>
                            </div>
                          )}
                          {company.contactPhone && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {company.contactPhone}
                            </div>
                          )}
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
                            <DropdownMenuItem asChild>
                              <Link href={`/companies/${company.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingCompany(company)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {company.isVerified ? (
                              <DropdownMenuItem onClick={() => handleUnverifyCompany(company.id)}>
                                <XCircle className="h-4 w-4 mr-2 text-orange-600" />
                                Remove Verification
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleVerifyCompany(company.id)}>
                                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                Verify Company
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteCompany(company.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingCompany} onOpenChange={(open) => !open && setEditingCompany(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Company</DialogTitle>
              <DialogDescription>
                Update company profile details.
              </DialogDescription>
            </DialogHeader>
            {editingCompany && (
              <CompanyForm 
                company={editingCompany} 
                onClose={() => setEditingCompany(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </FadeInUp>
    </div>
  )
}

function CompanyForm({ company, onClose }: { company?: EmployerProfile; onClose: () => void }) {
  const [formData, setFormData] = useState({
    companyName: company?.companyName || "",
    industry: company?.industry || "",
    companySize: company?.companySize || "",
    description: company?.description || "",
    website: company?.website || "",
    locationRegion: company?.locationRegion || "",
    locationCity: company?.locationCity || "",
    contactEmail: company?.contactEmail || "",
    contactPhone: company?.contactPhone || "",
    isVerified: company?.isVerified || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Company data:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => setFormData({ ...formData, industry: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size</Label>
          <Select
            value={formData.companySize}
            onValueChange={(value) => setFormData({ ...formData, companySize: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="501-1000">501-1000 employees</SelectItem>
              <SelectItem value="1000+">1000+ employees</SelectItem>
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
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {company ? "Update Company" : "Create Company"}
        </Button>
      </DialogFooter>
    </form>
  )
}
