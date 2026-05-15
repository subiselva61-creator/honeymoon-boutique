import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_TAG = 'cms'

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'REVALIDATE_SECRET is not configured' }, { status: 503 })
  }

  const headerSecret = req.headers.get('x-revalidate-secret')
  if (headerSecret !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  let tag = process.env.REVALIDATE_TAG || DEFAULT_TAG
  try {
    const body = await req.json()
    if (typeof body?.tag === 'string' && body.tag.length > 0) {
      tag = body.tag
    }
  } catch {
    // no body — use default tag
  }

  revalidateTag(tag)
  return NextResponse.json({ revalidated: true, tag })
}
