import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Assets',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || typeof data !== 'object') return data
        const doc = data as Record<string, unknown>
        const current = typeof doc.alt === 'string' ? doc.alt.trim() : ''
        if (current) return data

        const filename =
          typeof doc.filename === 'string'
            ? doc.filename
            : typeof doc.originalFilename === 'string'
              ? doc.originalFilename
              : ''

        const derived =
          filename !== ''
            ? filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
            : ''

        doc.alt = derived || 'Decorative image'
        return data
      },
    ],
  },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Alt text for accessibility and SEO (optional at upload—we auto-fill from the file name).',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
