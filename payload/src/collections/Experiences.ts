import type { CollectionConfig } from 'payload'

import { publicReadAuthenticatedWrite } from '../access/content'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
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
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Luxury Hotel', value: 'hotel' },
        { label: 'Private Villa', value: 'villa' },
        { label: 'Safari', value: 'safari' },
        { label: 'Cruise', value: 'cruise' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Wellness & Spa', value: 'wellness' },
        { label: 'Culinary', value: 'culinary' },
        { label: 'Cultural', value: 'cultural' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
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
