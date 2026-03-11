'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Instagram, Youtube, MessageCircle, ArrowLeft, Send } from 'lucide-react'

export default function GetInTouchPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:reckonprojectcenter16072023@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      )}`
      window.location.href = mailtoLink

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: '7010483491',
      link: 'tel:7010483491',
      action: 'Call',
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'reckonprojectcenter16072023@gmail.com',
      link: 'mailto:reckonprojectcenter16072023@gmail.com',
      action: 'Email',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      link: 'https://whatsapp.com/channel/0029VakiRVFKGGGNHPYsGR01',
      action: 'WhatsApp',
    },
  ]

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      link: 'https://instagram.com/reckon_project_center?igshid=MzRlODBiNWFlZA==',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      link: 'https://www.youtube.com/@RECKONPROJECTCENTRE',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900">Get in Touch</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Let's talk about your project
              </h2>
              <p className="text-slate-600 text-lg">
                We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{method.title}</h3>
                      <p className="text-slate-600">{method.description}</p>
                    </div>
                    <span className="text-blue-600 font-medium whitespace-nowrap">{method.action}</span>
                  </a>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Follow us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                      title={social.label}
                    >
                      <Icon className="w-6 h-6 text-slate-600 hover:text-slate-900" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-900 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              <p className="text-sm text-slate-600 text-center">
                We'll get back to you as soon as possible.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600">
          <p>© 2024 Reckon Project Center. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
