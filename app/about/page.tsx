"use client"

import Link from "next/link"
import { Target, Eye, Users, Award, Sparkles, Building2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { ROUTES, CONTACT_INFO } from "@/lib/constants"

const values = [
  {
    icon: Award,
    title: "Quality",
    description: "Commitment to exceeding the highest standards in every service delivered.",
  },
  {
    icon: Eye,
    title: "Integrity",
    description: "Conducting business with honesty, transparency, and ethical rigor.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Placing clients at the center, offering tailored, proactive solutions.",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Consistently delivering on promises and deadlines.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Embracing new technologies, especially AI, to drive efficiency and value.",
  },
]

const milestones = [
  { year: "2024", title: "Founded", description: "Alpha Jobs launched to serve the KSA job market" },
  { year: "2024", title: "1,000+ Jobs", description: "Reached first milestone of active job listings" },
  { year: "2024", title: "AI Integration", description: "Implemented AI-powered job matching" },
  { year: "2025", title: "Vision 2030", description: "Aligned operations with Saudi Vision 2030" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                About Alpha Jobs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Connecting Talent with Opportunity in Saudi Arabia
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Alpha Jobs is Saudi Arabia&apos;s premier job portal, powered by cutting-edge technology 
                and aligned with Vision 2030 to transform how job seekers and employers connect.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To consistently deliver high-quality, reliable, and exceptionally efficient 
                    recruitment services that address the evolving needs of the KSA job market. 
                    By leveraging innovative technological solutions and AI-powered insights, we 
                    ensure optimal outcomes, tangible value, and enduring trust with clients, 
                    employees, and partners.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp>
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Alpha Jobs envisions itself as a leading, unequivocally trusted name in Saudi 
                    Arabia&apos;s employment industry, recognized for pioneering technology integration 
                    and its relentless pursuit of excellence. We aspire to be a national benchmark 
                    for integrity, innovation, and impactful contributions to the Kingdom&apos;s 
                    development and Vision 2030 objectives.
                  </p>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="bg-card rounded-xl border border-border p-6 text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Vision 2030 Alignment */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium mb-6">
                  <Globe className="h-4 w-4" />
                  Vision 2030 Aligned
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Supporting Saudi Arabia&apos;s Transformation
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Alpha Jobs is strategically aligned with the pillars of Saudi Vision 2030, 
                    which seeks to diversify the economy, foster innovation, and build a 
                    sustainable, knowledge-based society.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <span><strong className="text-foreground">Economic Diversification:</strong> Supporting 
                      the knowledge-based infrastructure industry through AI-driven solutions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <span><strong className="text-foreground">Human Capital Development:</strong> Focusing 
                      on upskilling, Saudization, and digital literacy.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <span><strong className="text-foreground">Smart Cities:</strong> Contributing to 
                      giga-projects like NEOM through tech-forward recruitment solutions.</span>
                    </li>
                  </ul>
                </div>
              </FadeInUp>

              <FadeInUp>
                <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl p-8 lg:p-12">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Our Journey</h3>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < milestones.length - 1 && (
                            <div className="w-0.5 h-full bg-border flex-1 mt-2" />
                          )}
                        </div>
                        <div className="pb-6">
                          <span className="text-sm font-medium text-primary">{milestone.year}</span>
                          <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions or want to learn more about Alpha Jobs? We&apos;d love to hear from you.
              </p>
              <div className="bg-card rounded-xl border border-border p-8 mb-8">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Created by</span>
                    <span className="font-medium text-foreground">{CONTACT_INFO.creator}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Email</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium text-primary hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">{CONTACT_INFO.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Powered by</span>
                    <span className="font-medium text-primary">{CONTACT_INFO.company}</span>
                  </div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href={ROUTES.contact}>Contact Us</Link>
              </Button>
            </FadeInUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
