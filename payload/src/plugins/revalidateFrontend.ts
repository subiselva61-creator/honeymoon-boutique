import type { Config, Plugin } from 'payload'

const skipRevalidateSlugs = new Set(['users'])

async function pingFrontendRevalidate(): Promise<void> {
  const base = process.env.FRONTEND_REVALIDATE_URL || process.env.FRONTEND_URL
  const secret = process.env.FRONTEND_REVALIDATE_SECRET || process.env.REVALIDATE_SECRET
  if (!base?.trim() || !secret?.trim()) {
    return
  }
  const url = `${base.replace(/\/$/, '')}/api/revalidate`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ tag: process.env.REVALIDATE_TAG || 'cms' }),
    })
    if (!res.ok) {
      console.warn(`[revalidateFrontend] ${res.status} ${res.statusText}`)
    }
  } catch (err) {
    console.warn('[revalidateFrontend] request failed:', err)
  }
}

/** After CMS changes, bump Next.js ISR for the storefront (see frontend /api/revalidate). */
export const revalidateFrontendPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections || []).map((collection) => {
      if (skipRevalidateSlugs.has(collection.slug)) {
        return collection
      }
      const hooks = collection.hooks || {}
      return {
        ...collection,
        hooks: {
          ...hooks,
          afterChange: [...(hooks.afterChange || []), () => pingFrontendRevalidate()],
          afterDelete: [...(hooks.afterDelete || []), () => pingFrontendRevalidate()],
        },
      }
    }),
    globals: (config.globals || []).map((global) => {
      const hooks = global.hooks || {}
      return {
        ...global,
        hooks: {
          ...hooks,
          afterChange: [...(hooks.afterChange || []), () => pingFrontendRevalidate()],
        },
      }
    }),
  })
