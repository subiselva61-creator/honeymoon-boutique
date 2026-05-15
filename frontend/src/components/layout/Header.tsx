'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { normalizeSiteHref } from '@/lib/siteHref'

type Props = {
  data?: {
    logoText?: string
    navigation?: Array<{ label: string; href: string }>
    ctaButton?: { label: string; href: string }
  } | null
}

const DEFAULT_NAV = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
]

export default function Header({ data }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const logoText = data?.logoText || 'The Honeymoon Boutique'
  const navRaw = data?.navigation?.length ? data.navigation : DEFAULT_NAV
  const nav = navRaw.map(item => ({
    ...item,
    href: normalizeSiteHref(item.href),
    label: item.label,
  }))
  const ctaRaw = data?.ctaButton || { label: 'Plan My Honeymoon', href: '/contact' }
  const cta = { ...ctaRaw, href: normalizeSiteHref(ctaRaw.href) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4 shadow-sm' : 'py-6'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(250,247,242,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-light tracking-wider"
          style={{
            fontFamily: 'var(--font-display)',
            color: scrolled ? 'var(--color-deep)' : 'white',
            textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          {logoText}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(item => (
            <Link
              key={`${item.label}:${item.href}`}
              href={item.href}
              className="text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
              style={{
                color: scrolled ? 'var(--color-text)' : 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={cta.href}
            className="px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: scrolled ? 'var(--color-deep)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            }}
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: scrolled ? 'var(--color-deep)' : 'white' }}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-4"
          style={{ backgroundColor: 'var(--color-cream)' }}
        >
          {nav.map(item => (
            <Link
              key={`${item.label}:${item.href}`}
              href={item.href}
              className="block py-3 text-sm tracking-widest uppercase border-b"
              style={{
                color: 'var(--color-text)',
                borderColor: 'var(--color-champagne)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="block mt-4 py-3 text-sm tracking-widest uppercase text-center"
            style={{ backgroundColor: 'var(--color-deep)', color: 'white' }}
            onClick={() => setMenuOpen(false)}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </header>
  )
}
