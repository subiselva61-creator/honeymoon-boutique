import type { Block } from 'payload'

export const FeaturedGridBlock: Block = {
  slug: 'featuredGrid',
  labels: { singular: 'Featured Grid', plural: 'Featured Grids' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Featured Destinations' },
    { name: 'subheading', type: 'text' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (featured items)', value: 'auto' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'auto',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Destinations',
    },
    { name: 'viewAllHref', type: 'text', defaultValue: '/destinations' },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials Section', plural: 'Testimonials Sections' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'What Our Couples Say' },
    { name: 'subheading', type: 'text' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (featured)', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ],
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'Single large', value: 'single' },
      ],
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Start Planning Your Dream Honeymoon' },
    { name: 'subheading', type: 'text' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark overlay', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Brand color', value: 'brand' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Rich Content', plural: 'Rich Content Blocks' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'oneColumn',
      options: [
        { label: 'One Column', value: 'oneColumn' },
        { label: 'Two Columns', value: 'twoColumns' },
        { label: 'Image + Text', value: 'imageText' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.columns === 'imageText',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.columns === 'imageText',
      },
    },
  ],
}

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: { singular: 'Form Section', plural: 'Form Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'inline',
      options: [
        { label: 'Inline', value: 'inline' },
        { label: 'Card', value: 'card' },
        { label: 'Fullwidth', value: 'fullwidth' },
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Image Gallery', plural: 'Image Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'masonry',
      options: [
        { label: 'Masonry', value: 'masonry' },
        { label: 'Grid', value: 'grid' },
        { label: 'Lightbox', value: 'lightbox' },
      ],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats / Numbers', plural: 'Stats Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}
