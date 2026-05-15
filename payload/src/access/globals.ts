import type { GlobalConfig } from 'payload'

/** Public read for frontend; updates only when logged into admin */
export const publicReadAuthenticatedUpdate: GlobalConfig['access'] = {
  read: () => true,
  update: ({ req }) => Boolean(req.user),
}
