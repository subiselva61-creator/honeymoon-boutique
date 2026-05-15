import { getFeaturedTestimonials } from '@/lib/payload'

type Props = {
  heading?: string
  subheading?: string
  source?: 'auto' | 'manual'
  testimonials?: any[]
  style?: 'carousel' | 'grid' | 'single'
}

const FALLBACK = [
  {
    id: '1',
    name: 'Emma & James',
    location: 'London, UK',
    quote: 'Our Maldives honeymoon was everything we dreamed of and more. Every detail was perfectly curated — from the overwater villa to the private sunset dinner. Absolutely magical.',
    rating: 5,
    destination: { name: 'Maldives' },
  },
  {
    id: '2',
    name: 'Sophie & Lucas',
    location: 'Paris, France',
    quote: 'Santorini was breathtaking. The team knew exactly what we wanted before we even did. The sunrise sailing trip was the highlight of our lives.',
    rating: 5,
    destination: { name: 'Santorini' },
  },
  {
    id: '3',
    name: 'Priya & Arjun',
    location: 'Mumbai, India',
    quote: 'Bali exceeded our every expectation. The private villa, the spa treatments, the cultural experiences — all perfectly balanced. We\'re already planning our anniversary trip!',
    rating: 5,
    destination: { name: 'Bali' },
  },
]

async function getTestimonials(props: Props) {
  if (props.source === 'manual' && props.testimonials?.length) {
    return props.testimonials
  }
  try {
    const data = await getFeaturedTestimonials(6)
    return data.length ? data : FALLBACK
  } catch {
    return FALLBACK
  }
}

export default async function TestimonialsBlock({
  heading = 'Words From Our Couples',
  subheading,
  ...props
}: Props) {
  const items = await getTestimonials(props)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-champagne)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-rose)' }}>
            Love Stories
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {heading}
          </h2>
          {subheading && (
            <p className="text-base" style={{ color: 'var(--color-muted)' }}>{subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="p-8 relative"
              style={{ backgroundColor: 'var(--color-cream)', borderRadius: '2px' }}
            >
              {/* Quote mark */}
              <div
                className="text-6xl leading-none mb-4 font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-blush)' }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-rose)' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p
                className="text-base font-light leading-relaxed mb-6 italic"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {item.quote}
              </p>

              <div>
                <p className="font-medium text-sm tracking-wide" style={{ color: 'var(--color-deep)' }}>
                  {item.name}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                  {item.location}
                  {item.destination?.name && ` · ${item.destination.name}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
