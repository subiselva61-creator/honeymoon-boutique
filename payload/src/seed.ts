/**
 * Run this ONCE after your first `npm run dev` in the payload folder:
 *   npx ts-node --esm src/seed.ts
 * OR use the Payload admin UI to create content manually.
 */

import payload from 'payload'
import config from './payload.config'

async function seed() {
  await payload.init({ config })

  console.log('🌱 Seeding Payload CMS...')

  // Create admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@honeymoon.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
    })
    console.log('✅ Created admin user: admin@honeymoon.com / admin123')
  }

  // Create destinations
  const destinations = [
    {
      name: 'Santorini, Greece',
      slug: 'santorini',
      tagline: 'Clifftop sunsets & azure waters',
      excerpt: 'Iconic whitewashed villages perched above the volcanic caldera, with the most romantic sunsets on earth.',
      region: 'europe',
      featured: true,
      priceFrom: 3500,
      duration: '7–10 nights',
      highlights: [{ text: 'Private caldera-view villa' }, { text: 'Sunset sailing cruise' }, { text: 'Wine tasting in Oia' }],
      status: 'published',
    },
    {
      name: 'Maldives',
      slug: 'maldives',
      tagline: 'Overwater bliss',
      excerpt: 'Crystalline turquoise lagoons, pristine white sand beaches, and the ultimate in seclusion and romance.',
      region: 'asia',
      featured: true,
      priceFrom: 5000,
      duration: '7–14 nights',
      highlights: [{ text: 'Overwater bungalow' }, { text: 'Private snorkelling reef' }, { text: 'Underwater restaurant' }],
      status: 'published',
    },
    {
      name: 'Bali, Indonesia',
      slug: 'bali',
      tagline: 'Spiritual romance in paradise',
      excerpt: 'Ancient temples, emerald rice terraces, and private infinity-pool villas create an unforgettable romantic escape.',
      region: 'asia',
      featured: true,
      priceFrom: 2500,
      duration: '10–14 nights',
      highlights: [{ text: 'Private villa with rice terrace views' }, { text: 'Couples spa & wellness retreat' }, { text: 'Sunrise trek to Mount Batur' }],
      status: 'published',
    },
    {
      name: 'Amalfi Coast, Italy',
      slug: 'amalfi',
      tagline: 'La dolce vita for two',
      excerpt: 'Dramatic cliffs cascading into sapphire seas, lemon-scented air, and the most picturesque villages in the world.',
      region: 'europe',
      featured: true,
      priceFrom: 4000,
      duration: '7–10 nights',
      highlights: [{ text: 'Private boat tour' }, { text: 'Cooking class in Positano' }, { text: 'Cliffside villa with sea view' }],
      status: 'published',
    },
    {
      name: 'Kyoto, Japan',
      slug: 'kyoto',
      tagline: 'Timeless elegance',
      excerpt: 'Cherry blossoms, zen gardens, ancient temples, and the refined art of kaiseki dining make Kyoto utterly romantic.',
      region: 'asia',
      featured: true,
      priceFrom: 3000,
      duration: '7–10 nights',
      highlights: [{ text: 'Private ryokan with onsen' }, { text: 'Geisha district evening walk' }, { text: 'Tea ceremony for two' }],
      status: 'published',
    },
    {
      name: 'Seychelles',
      slug: 'seychelles',
      tagline: 'Pristine islands, endless love',
      excerpt: 'Massive granite boulders, turquoise waters, and complete privacy on some of the most beautiful beaches on earth.',
      region: 'africa',
      featured: true,
      priceFrom: 5500,
      duration: '10–14 nights',
      highlights: [{ text: 'Private beach villa' }, { text: 'Island hopping by boat' }, { text: 'Underwater world snorkelling' }],
      status: 'published',
    },
  ]

  for (const dest of destinations) {
    const existing = await payload.find({ collection: 'destinations', where: { slug: { equals: dest.slug } } })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'destinations', data: dest as any })
      console.log(`✅ Created destination: ${dest.name}`)
    }
  }

  // Create testimonials
  const testimonials = [
    {
      name: 'Emma & James',
      location: 'London, UK',
      quote: 'Our Maldives honeymoon was everything we dreamed of and more. Every detail was perfectly curated. Absolutely magical.',
      rating: 5,
      featured: true,
    },
    {
      name: 'Sophie & Lucas',
      location: 'Paris, France',
      quote: 'Santorini was breathtaking. The team knew exactly what we wanted before we even did. The sunrise sailing trip was the highlight of our lives.',
      rating: 5,
      featured: true,
    },
    {
      name: 'Priya & Arjun',
      location: 'Mumbai, India',
      quote: "Bali exceeded our every expectation. The private villa, the spa, the cultural experiences — all perfectly balanced. We're already planning our anniversary trip!",
      rating: 5,
      featured: true,
    },
  ]

  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: t as any })
    console.log(`✅ Created testimonial: ${t.name}`)
  }

  // Update Header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logoText: 'The Honeymoon Boutique',
      navigation: [
        { label: 'Destinations', href: '/destinations' },
        { label: 'Experiences', href: '/experiences' },
        { label: 'About', href: '/about' },
        { label: 'Journal', href: '/journal' },
      ],
      ctaButton: { label: 'Plan My Honeymoon', href: '/contact' },
    },
  })
  console.log('✅ Updated Header global')

  // Create homepage
  const existingHome = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        excerpt: 'Bespoke luxury honeymoon experiences crafted for your love story',
        layout: [
          {
            blockType: 'hero',
            heading: 'Your Perfect Honeymoon Awaits',
            subheading: 'Bespoke luxury travel crafted for your love story',
            overlayOpacity: 40,
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
              { number: '12+', label: 'Years Experience' },
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
            blockType: 'testimonials',
            heading: 'Words From Our Couples',
            subheading: 'Real stories from real honeymoons',
            source: 'auto',
            style: 'grid',
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
        ],
      } as any,
    })
    console.log('✅ Created Home page with all blocks')
  }

  console.log('\n🎉 Seeding complete!')
  console.log('   Admin URL: http://localhost:3001/admin')
  console.log('   Login: admin@honeymoon.com / admin123')
  process.exit(0)
}

seed().catch(console.error)
