import { getMediaUrl } from '@/lib/payload'
import Link from 'next/link'

type HeroProps = {
  heading: string
  subheading?: string
  backgroundImage?: any
  overlayOpacity?: number
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  style?: 'fullscreen' | 'split' | 'centered'
}

export default function HeroBlock({
  heading = 'Your Perfect Honeymoon Awaits',
  subheading,
  backgroundImage,
  overlayOpacity = 40,
  primaryCTA,
  secondaryCTA,
  style = 'fullscreen',
}: HeroProps) {
  const bgUrl = backgroundImage ? getMediaUrl(backgroundImage, 'hero') : null

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: style === 'fullscreen' ? '100vh' : '70vh' }}
    >
      {/* Background */}
      {bgUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #3d2b1f 0%, #c9826b 50%, #e8c9b8 100%)',
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${(overlayOpacity ?? 40) / 100})` }}
      />

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-24 h-24 border border-white/20 rounded-full" />
      <div className="absolute bottom-16 right-12 w-40 h-40 border border-white/10 rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6 font-light"
          style={{ color: 'rgba(232,201,184,0.9)' }}
        >
          Luxury Honeymoon Specialists
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {subheading}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="px-10 py-4 text-sm tracking-widest uppercase font-light border border-white text-white hover:bg-white hover:text-[var(--color-deep)] transition-all duration-300"
            >
              {primaryCTA.label}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="px-10 py-4 text-sm tracking-widest uppercase font-light bg-[var(--color-rose)] text-white hover:bg-[var(--color-blush)] hover:text-[var(--color-deep)] transition-all duration-300"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/30" />
      </div>
    </section>
  )
}
