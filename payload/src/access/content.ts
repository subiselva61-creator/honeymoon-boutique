import type { CollectionConfig } from 'payload'

/** Public read API; edits require CMS login */
export const publicReadAuthenticatedWrite: CollectionConfig['access'] = {
  read: () => true,
  create: ({ req }) => Boolean(req.user),
  update: ({ req }) => Boolean(req.user),
  delete: ({ req }) => Boolean(req.user),
}
