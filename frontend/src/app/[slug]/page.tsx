import { getPageBySlug, getAllPages } from '@/lib/payload'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const pages = await getAllPages()
    return pages
      .filter((p: any) => p.slug !== 'home')
      .map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const page = await getPageBySlug(slug)
    if (page?.meta) {
      return { title: page.meta.title || page.title, description: page.meta.description }
    }
    if (page) return { title: page.title }
  } catch {}
  return {}
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  let page: any = null

  try {
    page = await getPageBySlug(slug)
  } catch {
    // CMS offline
  }

  if (!page) notFound()

  return <BlockRenderer blocks={page.layout || []} />
}
