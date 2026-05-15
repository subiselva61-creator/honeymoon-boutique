import Link from 'next/link'

type Props = {
  data?: {
    logoText?: string
    tagline?: string
    columns?: Array<{ heading: string; links: Array<{ label: string; href: string }> }>
    socialLinks?: Array<{ platform: string; href: string }>
    copyright?: string
  } | null
}

const DEFAULT_COLUMNS = [
  {
    heading: 'Destinations',
    links: [
      { label: 'Santorini', href: '/destinations/santorini' },
      { label: 'Maldives', href: '/destinations/maldives' },
      { label: 'Bali', href: '/destinations/bali' },
      { label: 'Amalfi Coast', href: '/destinations/amalfi' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Honeymoon Planning', href: '/services' },
      { label: 'Luxury Villas', href: '/experiences' },
      { label: 'Private Transfers', href: '/services' },
      { label: 'Concierge', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Journal', href: '/journal' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer({ data }: Props) {
  const logoText = data?.logoText || 'The Honeymoon Boutique'
  const tagline = data?.tagline || 'Crafting unforgettable love stories around the world.'
  const columns = data?.columns?.length ? data.columns : DEFAULT_COLUMNS
  const copyright = data?.copyright || `© ${new Date().getFullYear()} The Honeymoon Boutique. All rights reserved.`

  return (
    <footer style={{ backgroundColor: 'var(--color-deep)', color: 'rgba(255,255,255,0.7)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-light text-white mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {logoText}
            </h3>
            <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {tagline}
            </p>
            {/* Social */}
            {data?.socialLinks?.map(s => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase mr-4 hover:text-white transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-white mb-6">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-light hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
        >
          <p>{copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
