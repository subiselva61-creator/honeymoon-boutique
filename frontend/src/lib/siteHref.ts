/**
 * Normalizes CMS menu href for Next.js `<Link>`: trim, add missing leading /
 * External http(s), mailto, tel are left as-is.
 */
export function normalizeSiteHref(href: string | null | undefined): string {
  let h = String(href ?? '').trim()
  if (!h) return '/'
  if (/^https?:\/\//i.test(h) || /^mailto:/i.test(h) || /^tel:/i.test(h)) return h
  if (!h.startsWith('/')) h = `/${h}`
  return h.replace(/\/{2,}/g, '/')
}
