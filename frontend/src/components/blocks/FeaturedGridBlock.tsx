import { getFeaturedDestinations, getMediaUrl } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  heading?: string
  subheading?: string
  style?: 'grid' | 'masonry' | 'carousel'
  source?: 'auto' | 'manual'
  destinations?: any[]
  limit?: number
  viewAllLabel?: string
  viewAllHref?: string
}

async function getDestinations(props: Props) {
  if (props.source === 'manual' && props.destinations?.length) {
    return props.destinations
  }
  try {
    return await getFeaturedDestinations(props.limit || 6)
  } catch {
    return FALLBACK_DESTINATIONS
  }
}

const FALLBACK_DESTINATIONS = [
  { id: '1', name: 'Santorini, Greece', slug: 'santorini', tagline: 'Clifftop sunsets & azure waters', excerpt: 'Iconic whitewashed villages perched above the caldera.' },
  { id: '2', name: 'Bali, Indonesia', slug: 'bali', tagline: 'Spiritual romance in paradise', excerpt: 'Ancient temples, lush rice terraces, and private villas.' },
  { id: '3', name: 'Maldives', slug: 'maldives', tagline: 'Overwater bliss', excerpt: 'Crystalline lagoons and ultimate seclusion.' },
  { id: '4', name: 'Amalfi Coast', slug: 'amalfi', tagline: 'La dolce vita for two', excerpt: 'Dramatic cliffs, pastel villages, and Italian romance.' },
  { id: '5', name: 'Kyoto, Japan', slug: 'kyoto', tagline: 'Timeless elegance', excerpt: 'Cherry blossoms, zen gardens, and ancient traditions.' },
  { id: '6', name: 'Seychelles', slug: 'seychelles', tagline: 'Pristine islands, endless love', excerpt: 'Granite boulders, turquoise seas, and complete privacy.' },
]

const GRADIENT_CARDS = [
  'linear-gradient(135deg, #c9826b, #e8c9b8)',
  'linear-gradient(135deg, #3d2b1f, #8a7068)',
  'linear-gradient(135deg, #8a7068, #c9826b)',
  'linear-gradient(135deg, #e8c9b8, #c9826b)',
  'linear-gradient(135deg, #3d2b1f, #c9826b)',
  'linear-gradient(135deg, #8a7068, #e8c9b8)',
]

export default async function FeaturedGridBlock({
  heading = 'Dream Destinations',
  subheading,
  viewAllLabel = 'View All Destinations',
  viewAllHref = '/destinations',
  ...props
}: Props) {
  const destinations = await getDestinations(props)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-rose)' }}>
            Destinations
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {heading}
          </h2>
          {subheading && (
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest: any, i: number) => {
            const imgUrl = dest.heroImage ? getMediaUrl(dest.heroImage, 'card') : null
            return (
              <Link
                key={dest.id || i}
                href={`/destinations/${dest.slug}`}
                className="group relative overflow-hidden aspect-[4/5] block"
                style={{ borderRadius: '2px' }}
              >
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={dest.heroImage?.alt || dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: GRADIENT_CARDS[i % GRADIENT_CARDS.length] }}
                  />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {dest.region && (
                    <p className="text-xs tracking-widest uppercase mb-2 opacity-70">
                      {dest.region}
                    </p>
                  )}
                  <h3 className="text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {dest.name}
                  </h3>
                  {dest.tagline && (
                    <p className="text-sm opacity-80 font-light">{dest.tagline}</p>
                  )}
                  {dest.priceFrom && (
                    <p className="text-xs mt-3 opacity-60 tracking-wider">
                      From ${dest.priceFrom.toLocaleString()} pp
                    </p>
                  )}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All */}
        {viewAllHref && (
          <div className="text-center mt-14">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase border-b pb-1 hover:gap-5 transition-all duration-300"
              style={{ color: 'var(--color-deep)', borderColor: 'var(--color-rose)' }}
            >
              {viewAllLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
