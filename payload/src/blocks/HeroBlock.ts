import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Your Perfect Honeymoon Awaits',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Bespoke luxury travel crafted for your love story',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 40,
      admin: {
        description: 'Dark overlay % (0 = none, 100 = full black)',
      },
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Explore Destinations' },
        { name: 'href', type: 'text', defaultValue: '/destinations' },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Plan My Trip' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'fullscreen',
      options: [
        { label: 'Fullscreen', value: 'fullscreen' },
        { label: 'Split', value: 'split' },
        { label: 'Centered', value: 'centered' },
      ],
    },
  ],
}
