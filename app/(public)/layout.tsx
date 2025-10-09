'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GraduationCap, Mail, Phone, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modern Sticky Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-poppins text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                L2+ English
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-inter px-4 py-2 rounded-lg text-sm font-semibold transition-all relative',
                    isActive(link.href)
                      ? 'text-white bg-primary shadow-md'
                      : 'text-gray-100 hover:text-white hover:bg-primary/90'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="ml-4 flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-semibold">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="shadow-md font-semibold rounded-lg px-6 transition-all hover:shadow-lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-100" />
              ) : (
                <Menu className="w-6 h-6 text-gray-100" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 animate-in slide-in-from-top-2">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'font-inter px-4 py-3 rounded-lg text-base font-semibold transition-all',
                      isActive(link.href)
                        ? 'text-white bg-primary shadow-md border-l-4 border-secondary'
                        : 'text-gray-100 hover:text-white hover:bg-primary/90'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="default" className="w-full font-semibold">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="default"
                      className="w-full shadow-md font-semibold"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Beautiful Footer */}
      <footer className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="font-poppins text-xl font-bold">L2+ English</span>
              </div>
              <p className="font-inter text-sm text-white/80 leading-relaxed">
                Master English with expert-led classes and personalized learning. CEFR-aligned curriculum from A1 to C2.
              </p>
            </div>
            <div>
              <h4 className="font-poppins font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 font-inter text-sm">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                    → About Us
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                    → Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                    → Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-poppins font-semibold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 font-inter text-sm">
                <li>
                  <a href="mailto:hello@l2plusenglish.com" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    hello@l2plusenglish.com
                  </a>
                </li>
                <li>
                  <a href="tel:+441234567890" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +44 (0) 123 456 7890
                  </a>
                </li>
                <li>
                  <Link href="/login" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                    → Student Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-poppins font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 font-inter text-sm">
                <li className="text-white/60">Privacy Policy</li>
                <li className="text-white/60">Terms of Service</li>
                <li className="text-white/60">Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center font-inter text-sm text-white/60">
            © {new Date().getFullYear()} L2+ English. All rights reserved. Built with ❤️ for English learners worldwide.
          </div>
        </div>
      </footer>
    </div>
  )
}
