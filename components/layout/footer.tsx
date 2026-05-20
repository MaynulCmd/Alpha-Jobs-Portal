import Link from "next/link"
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { Logo } from "./logo"
import { ROUTES, CONTACT_INFO } from "@/lib/constants"

const footerLinks = {
  forJobSeekers: [
    { label: "Browse Jobs", href: ROUTES.jobs },
    { label: "Companies", href: ROUTES.companies },
    { label: "Create CV", href: ROUTES.seeker.cvBuilder },
    { label: "Job Alerts", href: "#" },
    { label: "Career Resources", href: "#" },
  ],
  forEmployers: [
    { label: "Post a Job", href: ROUTES.employer.newJob },
    { label: "Browse Candidates", href: "#" },
    { label: "Pricing Plans", href: "#" },
    { label: "Recruitment Solutions", href: "#" },
  ],
  company: [
    { label: "About Us", href: ROUTES.about },
    { label: "Contact", href: ROUTES.contact },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Help Center", href: "#" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.home} className="inline-block mb-4">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Ultra-modern Saudi job portal for seekers and employers. Smart, fast, and tailored to the KSA job market.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{CONTACT_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              {footerLinks.forJobSeekers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-3">
              {footerLinks.forEmployers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Alpha Jobs. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Created by <span className="text-foreground">{CONTACT_INFO.creator}</span> | 
              Powered by <span className="text-primary font-medium">{CONTACT_INFO.company}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
