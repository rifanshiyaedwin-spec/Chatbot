'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import Link from 'next/link'

export default function ServicesPage() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const services = [
    {
      title: 'Project Work',
      description: 'Comprehensive project solutions for Diploma & Engineering students across all departments. We provide complete guidance from conceptualization to implementation.',
      image: '/projects-work.jpg',
      icon: '📋',
    },
    {
      title: 'Internship Program',
      description: 'Professional internship guidance and certification programs to help you gain real-world experience and enhance your career prospects.',
      image: '/internship-guidance.jpg',
      icon: '🎓',
    },
    {
      title: 'Journal Publishing',
      description: 'Expert assistance with paper publishing and academic excellence. We guide you through the entire publication process.',
      image: '/publishing-papers.jpg',
      icon: '📚',
    },
    {
      title: 'School Projects',
      description: 'Complete project solutions tailored for school students. From simple projects to complex assignments, we have you covered.',
      image: '/school-projects.jpg',
      icon: '🔧',
    },
    {
      title: 'Mini & Main Projects',
      description: 'Technical implementation support for mini and main projects. Our experts provide hands-on guidance throughout the development process.',
      image: '/mini-main-projects.jpg',
      icon: '⚙️',
    },
    {
      title: 'Documentation & PPT',
      description: 'Professional report writing and presentation design. We ensure your documentation meets academic and professional standards.',
      image: '/documentation-ppt.jpg',
      icon: '📝',
    },
    {
      title: 'Tuition Classes',
      description: 'Expert tutoring classes for Diploma & BE Mechanical Engineering covering all subjects with experienced instructors.',
      image: '/tutoring-classes.jpg',
      icon: '👨‍🏫',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline">Reckon Project Center</span>
            </Link>
          </div>
          <Button
            onClick={() => setContactFormOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </Button>
        </nav>
      </header>

      {/* Page Header */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 text-center">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full border border-secondary/40">
              <p className="text-sm font-semibold text-secondary">Our Services</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Comprehensive Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From project work to tutoring, we offer complete support for your academic journey. Choose the service that fits your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-6xl">{service.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
                  <Button
                    onClick={() => setContactFormOpen(true)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Get More Info
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Contact us today to discuss your needs and find the perfect solution for your academic goals.
            </p>
          </div>
          <Button
            onClick={() => setContactFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base"
          >
            Contact Us Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Reckon Project Center</h3>
              <p className="text-sm opacity-80">
                Your trusted partner for academic excellence and professional guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                    Services
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setContactFormOpen(true)}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://instagram.com/reckon_project_center?igshid=MzRlODBiNWFlZA=="
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@RECKONPROJECTCENTRE"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029VakiRVFKGGGNHPYsGR01"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 Reckon Project Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </main>
  )
}
