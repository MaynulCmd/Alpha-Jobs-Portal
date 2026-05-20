"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FadeInUp } from "@/components/ui/animations"
import { CONTACT_INFO } from "@/lib/constants"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Contact form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <FadeInUp className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
              <p className="text-muted-foreground">
                Have questions or feedback? We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </FadeInUp>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <FadeInUp className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground mb-1">Email</h3>
                          <a 
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {CONTACT_INFO.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground mb-1">Location</h3>
                          <p className="text-muted-foreground">{CONTACT_INFO.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground mb-1">Phone</h3>
                          <p className="text-muted-foreground">Available upon request</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-medium text-foreground mb-2">Office Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Sunday - Thursday: 9:00 AM - 6:00 PM (AST)<br />
                      Friday - Saturday: Closed
                    </p>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-medium text-foreground mb-2">Powered by</h3>
                    <p className="text-primary font-semibold">{CONTACT_INFO.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created by {CONTACT_INFO.creator}
                    </p>
                  </div>
                </div>
              </FadeInUp>

              {/* Contact Form */}
              <FadeInUp className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h2>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              {...register("name")}
                              className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              {...register("email")}
                              className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="How can we help?"
                            {...register("subject")}
                            className={errors.subject ? "border-destructive" : ""}
                          />
                          {errors.subject && (
                            <p className="text-sm text-destructive">{errors.subject.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us more about your inquiry..."
                            rows={6}
                            {...register("message")}
                            className={errors.message ? "border-destructive" : ""}
                          />
                          {errors.message && (
                            <p className="text-sm text-destructive">{errors.message.message}</p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                  <circle 
                                    className="opacity-25" 
                                    cx="12" 
                                    cy="12" 
                                    r="10" 
                                    stroke="currentColor" 
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path 
                                    className="opacity-75" 
                                    fill="currentColor" 
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                              </span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
