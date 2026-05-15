import type { CollectionConfig } from 'payload'

import { publicReadAuthenticatedWrite } from '../access/content'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: publicReadAuthenticatedWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short catchy line shown on cards',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'region',
      type: 'select',
      options: [
        { label: 'Europe', value: 'europe' },
        { label: 'Asia', value: 'asia' },
        { label: 'Caribbean', value: 'caribbean' },
        { label: 'Africa', value: 'africa' },
        { label: 'Americas', value: 'americas' },
        { label: 'Pacific', value: 'pacific' },
        { label: 'Middle East', value: 'middle-east' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'priceFrom',
      type: 'number',
      admin: {
        description: 'Starting price per person (USD)',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'e.g. "7–14 nights"',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage featured section',
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
