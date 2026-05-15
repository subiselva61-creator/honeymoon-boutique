import type { CollectionConfig } from 'payload'

import { publicReadAuthenticatedWrite } from '../access/content'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturedGridBlock } from '../blocks/FeaturedGridBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { CTABlock } from '../blocks/CTABlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { FormBlock } from '../blocks/FormBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { StatsBlock } from '../blocks/StatsBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
  },
  access: publicReadAuthenticatedWrite,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug, e.g. "home", "about", "destinations"',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description used for SEO and cards',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeaturedGridBlock,
        TestimonialsBlock,
        CTABlock,
        ContentBlock,
        FormBlock,
        GalleryBlock,
        StatsBlock,
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
