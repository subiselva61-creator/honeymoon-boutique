'use client'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/payload'

// ─── CTA Block ────────────────────────────────────────────────────────────────

type CTAButton = { label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' }

type CTAProps = {
  heading?: string
  subheading?: string
  backgroundImage?: any
  style?: 'dark' | 'light' | 'brand'
  buttons?: CTAButton[]
}

export function CTABlockClient({
  heading = 'Start Planning Your Dream Honeymoon',
  subheading,
  backgroundImage,
  style = 'dark',
  buttons = [],
}: CTAProps) {
  const bgUrl = backgroundImage ? getMediaUrl(backgroundImage, 'hero') : null

  const bgStyle: React.CSSProperties = bgUrl
    ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : style === 'brand'
    ? { backgroundColor: 'var(--color-rose)' }
    : style === 'light'
    ? { backgroundColor: 'var(--color-champagne)' }
    : { backgroundColor: 'var(--color-deep)' }

  const textColor = style === 'light' ? 'var(--color-deep)' : 'white'

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={bgStyle}>
      {bgUrl && style === 'dark' && <div className="absolute inset-0 bg-black/50" />}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl md:text-6xl font-light mb-6"
          style={{ fontFamily: 'var(--font-display)', color: textColor }}
        >
          {heading}
        </h2>
        {subheading && (
          <p className="text-base mb-10 font-light" style={{ color: textColor, opacity: 0.85 }}>
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={`px-10 py-4 text-sm tracking-widest uppercase font-light transition-all duration-300 ${
                btn.variant === 'outline'
                  ? 'border border-white text-white hover:bg-white hover:text-[var(--color-deep)]'
                  : btn.variant === 'secondary'
                  ? 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                  : 'bg-[var(--color-rose)] text-white hover:bg-[var(--color-blush)] hover:text-[var(--color-deep)]'
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats Block ──────────────────────────────────────────────────────────────

type Stat = { number: string; label: string; description?: string }

type StatsProps = {
  heading?: string
  stats?: Stat[]
}

export function StatsBlockClient({ heading, stats = [] }: StatsProps) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-deep)' }}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2
            className="text-center text-3xl md:text-5xl font-light text-white mb-16"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className="text-5xl md:text-6xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-blush)' }}
              >
                {stat.number}
              </p>
              <p className="text-sm tracking-widest uppercase text-white/70 mb-1">{stat.label}</p>
              {stat.description && (
                <p className="text-xs text-white/50 font-light">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Content Block ────────────────────────────────────────────────────────────

export function ContentBlockClient({ content, columns = 'oneColumn' }: any) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto prose prose-lg" style={{ color: 'var(--color-text)' }}>
        {content && (
          <div
            dangerouslySetInnerHTML={{
              __html: typeof content === 'string' ? content : '[Rich content renders here]',
            }}
          />
        )}
      </div>
    </section>
  )
}

// ─── Gallery Block ────────────────────────────────────────────────────────────

export function GalleryBlockClient({ heading, images = [] }: any) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2
            className="text-center text-4xl font-light mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-deep)' }}
          >
            {heading}
          </h2>
        )}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((item: any, i: number) => {
            const url = item.image ? getMediaUrl(item.image, 'card') : null
            return url ? (
              <div key={i} className="break-inside-avoid overflow-hidden group">
                <img
                  src={url}
                  alt={item.caption || item.image?.alt || ''}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : null
          })}
        </div>
      </div>
    </section>
  )
}
