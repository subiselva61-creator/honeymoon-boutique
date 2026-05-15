import type { CollectionConfig } from 'payload'

import { publicReadAuthenticatedWrite } from '../access/content'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
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
      name: 'location',
      type: 'text',
      admin: {
        description: 'e.g. "London, UK"',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'photo',
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
  ],
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
