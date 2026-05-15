import qs from 'qs'

const PAYLOAD_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3002/api'

type FetchOptions = {
  depth?: number
  where?: Record<string, unknown>
  limit?: number
  page?: number
  sort?: string
  cache?: RequestCache
  revalidate?: number | false
}

async function payloadFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { depth = 1, where, limit = 100, page = 1, sort, cache, revalidate } = options

  const query = qs.stringify(
    { depth, where, limit, page, sort },
    { addQueryPrefix: true, encode: false }
  )

  const url = `${PAYLOAD_URL}${path}${query}`

  const nextOpts: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {}
  if (cache) nextOpts.cache = cache
  const tag = process.env.REVALIDATE_TAG || 'cms'
  if (revalidate !== undefined) {
    nextOpts.next = { revalidate, tags: [tag] }
  } else {
    nextOpts.next = { revalidate: 60, tags: [tag] }
  }

  const res = await fetch(url, nextOpts)

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${res.status} ${res.statusText} for ${url}`)
  }

  return res.json()
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string) {
  const data = await payloadFetch<{ docs: any[] }>('/pages', {
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 3,
  })
  return data.docs[0] ?? null
}

export async function getAllPages() {
  const data = await payloadFetch<{ docs: any[] }>('/pages', {
    where: { status: { equals: 'published' } },
    limit: 200,
    depth: 1,
  })
  return data.docs
}

// ─── Destinations ─────────────────────────────────────────────────────────────

export async function getFeaturedDestinations(limit = 6) {
  const data = await payloadFetch<{ docs: any[] }>('/destinations', {
    where: { featured: { equals: true }, status: { equals: 'published' } },
    depth: 2,
    limit,
  })
  return data.docs
}

export async function getAllDestinations(options: FetchOptions = {}) {
  const data = await payloadFetch<{ docs: any[]; totalDocs: number }>('/destinations', {
    where: { status: { equals: 'published' } },
    depth: 2,
    ...options,
  })
  return data
}

export async function getDestinationBySlug(slug: string) {
  const data = await payloadFetch<{ docs: any[] }>('/destinations', {
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 3,
  })
  return data.docs[0] ?? null
}

// ─── Experiences ──────────────────────────────────────────────────────────────

export async function getFeaturedExperiences(limit = 6) {
  const data = await payloadFetch<{ docs: any[] }>('/experiences', {
    where: { featured: { equals: true }, status: { equals: 'published' } },
    depth: 2,
    limit,
  })
  return data.docs
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getFeaturedTestimonials(limit = 6) {
  const data = await payloadFetch<{ docs: any[] }>('/testimonials', {
    where: { featured: { equals: true } },
    depth: 2,
    limit,
  })
  return data.docs
}

// ─── Globals ──────────────────────────────────────────────────────────────────

export async function getHeader() {
  return payloadFetch<any>('/globals/header', { depth: 2 })
}

export async function getFooter() {
  return payloadFetch<any>('/globals/footer', { depth: 2 })
}

export async function getSiteSettings() {
  return payloadFetch<any>('/globals/site-settings', { depth: 2 })
}

// ─── Media URL helper ─────────────────────────────────────────────────────────

export function getMediaUrl(media: any, size?: string): string {
  if (!media) return '/placeholder.jpg'
  const sized = size && media.sizes?.[size]?.url
  const pathOrUrl = sized || media.url
  if (typeof pathOrUrl !== 'string' || pathOrUrl.length === 0) return '/placeholder.jpg'
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  const PAYLOAD_BASE = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3002'
  return `${PAYLOAD_BASE}${pathOrUrl}`
}

// ─── Forms ────────────────────────────────────────────────────────────────────

export async function getForm(id: string) {
  return payloadFetch<any>(`/forms/${id}`, { depth: 1 })
}

export async function submitForm(formId: string, data: Record<string, string>) {
  const res = await fetch(`${PAYLOAD_URL}/form-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form: formId, submissionData: Object.entries(data).map(([field, value]) => ({ field, value })) }),
  })
  if (!res.ok) throw new Error('Form submission failed')
  return res.json()
}
