import { getPageBySlug } from '@/lib/payload'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import type { Metadata } from 'next'

// Fallback static blocks for when CMS is empty / not connected
const FALLBACK_BLOCKS = [
  {
    blockType: 'hero',
    heading: 'Your Perfect Honeymoon Awaits',
    subheading: 'Bespoke luxury travel crafted for your love story',
    primaryCTA: { label: 'Explore Destinations', href: '/destinations' },
    secondaryCTA: { label: 'Plan My Trip', href: '/contact' },
    style: 'fullscreen',
  },
  {
    blockType: 'stats',
    heading: 'Why Couples Choose Us',
    stats: [
      { number: '2,400+', label: 'Honeymoons Planned' },
      { number: '85+', label: 'Destinations' },
      { number: '98%', label: 'Satisfaction Rate' },
      { number: '12+', label: 'Years of Experience' },
    ],
  },
  {
    blockType: 'featuredGrid',
    heading: 'Dream Destinations',
    subheading: 'Hand-picked escapes for the most romantic chapter of your life',
    source: 'auto',
    limit: 6,
    viewAllLabel: 'View All Destinations',
    viewAllHref: '/destinations',
  },
  {
    blockType: 'cta',
    heading: 'Let Us Create Your Perfect Escape',
    subheading: 'Every honeymoon is as unique as your love story. Tell us yours.',
    style: 'dark',
    buttons: [
      { label: 'Start Planning', href: '/contact', variant: 'primary' },
      { label: 'Learn More', href: '/about', variant: 'outline' },
    ],
  },
  {
    blockType: 'testimonials',
    heading: 'Words From Our Couples',
    subheading: 'Real stories from real honeymoons',
    source: 'auto',
    style: 'carousel',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('home')
    if (page?.meta) {
      return {
        title: page.meta.title || page.title,
        description: page.meta.description,
      }
    }
  } catch {}
  return {}
}

export default async function HomePage() {
  let page: any = null

  try {
    page = await getPageBySlug('home')
  } catch {
    // CMS not running — use fallback
  }

  const blocks = page?.layout?.length ? page.layout : FALLBACK_BLOCKS

  return <BlockRenderer blocks={blocks} />
}
