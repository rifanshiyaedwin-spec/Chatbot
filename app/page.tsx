'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Globe, Instagram, Youtube, MessageCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const services = [
    {
      title: 'Project Work',
      description: 'Diploma & Engineering (All Departments)',
      image: '/projects-work.jpg',
      icon: '📋',
    },
    {
      title: 'Internship Program',
      description: 'Guidance & Certification',
      image: '/internship-guidance.jpg',
      icon: '🎓',
    },
    {
      title: 'Journal Publishing',
      description: 'Paper Publishing & Academic Excellence',
      image: '/publishing-papers.jpg',
      icon: '📚',
    },
    {
      title: 'School Projects',
      description: 'Complete Project Solutions',
      image: '/school-projects.jpg',
      icon: '🔧',
    },
    {
      title: 'Mini & Main Projects',
      description: 'Technical Implementation Support',
      image: '/mini-main-projects.jpg',
      icon: '⚙️',
    },
    {
      title: 'Documentation & PPT',
      description: 'Report Writing & Professional Presentation',
      image: '/documentation-ppt.jpg',
      icon: '📝',
    },
    {
      title: 'Tuition Classes',
      description: 'Diploma & BE Mechanical Engineering (All Subjects)',
      image: '/tutoring-classes.jpg',
      icon: '👨‍🏫',
    },
  ]

  const contactInfo = [
    {
      icon: Phone,
      label: 'Contact',
      value: '7010483491',
      link: 'tel:7010483491',
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'muthunughty420.wixsite.com/reckonprojectcente-5',
      link: 'https://muthunughty420.wixsite.com/reckonprojectcente-5',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: 'Reckon Project Center',
      link: 'https://instagram.com/reckon_project_center?igshid=MzRlODBiNWFlZA==',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      value: 'RECKON PROJECT CENTRE',
      link: 'https://www.youtube.com/@RECKONPROJECTCENTRE',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Reckon Project Center',
      link: 'https://wa.me/7010483491',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Reckon Project Center</span>
          </div>
          <a
            href="tel:7010483491"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full border border-secondary/40">
                  <p className="text-sm font-semibold text-secondary">Welcome to Excellence</p>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Hi, this is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Muthu</span> – Reckon Project Center
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your trusted partner for academic excellence. We provide comprehensive project work, internship guidance, and professional tutoring for diploma and engineering students across all departments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="px-8 py-6 text-base">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-students.jpg"
                  alt="Students working on engineering projects"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions for your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border bg-background ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${100 * index}ms` : '0ms',
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl">{service.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Connect with us through your preferred channel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border text-center hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">{contact.label}</p>
                  <p className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {contact.value}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="text-lg text-white/90">
              Join hundreds of successful students who have achieved their goals with Reckon Project Center.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-base font-semibold"
            >
              <a href="tel:7010483491">Call Now</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-semibold"
            >
              <a href="https://wa.me/7010483491">WhatsApp Us</a>
            </Button>
          </div>

          <p className="text-sm text-white/80 pt-8">
            Support us and share with your friends!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg">
                  R
                </div>
                <span className="font-bold">Reckon Project Center</span>
              </div>
              <p className="text-white/70">Your partner for academic projects and professional education.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Project Work</li>
                <li>Internship Guidance</li>
                <li>Journal Publishing</li>
                <li>Tuition Classes</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <a href="tel:7010483491" className="hover:text-white transition-colors">
                    Call: 7010483491
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/reckon_project_center?igshid=MzRlODBiNWFlZA==" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@RECKONPROJECTCENTRE" className="hover:text-white transition-colors">
                    YouTube Channel
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>© 2024 Reckon Project Center. All rights reserved. | Powered by Excellence in Education</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
