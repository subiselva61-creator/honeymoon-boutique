import { buildConfig } from 'payload'
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Pages } from './collections/Pages'
import { Destinations } from './collections/Destinations'
import { Experiences } from './collections/Experiences'
import { Media } from './collections/Media'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { revalidateFrontendPlugin } from './plugins/revalidateFrontend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000'
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_SERVER_URL || 'http://localhost:3002'

/** Same hostname as localhost ↔ 127.0.0.1 so JWT cookie extraction accepts both admin URLs */
function twinLocalOrigin(origin: string): string | null {
  try {
    const parsed = new URL(origin)
    if (parsed.hostname === 'localhost') {
      parsed.hostname = '127.0.0.1'
      return parsed.origin
    }
    if (parsed.hostname === '127.0.0.1') {
      parsed.hostname = 'localhost'
      return parsed.origin
    }
  } catch {
    // ignore
  }
  return null
}

const extraOrigins = (process.env.PAYLOAD_ALLOWED_ORIGINS ?? '')
  .split(/[, \n]+/)
  .map((o) => o.trim())
  .filter(Boolean)

const trustedOrigins = Array.from(
  new Set<string>(
    [...[frontendURL, serverURL, twinLocalOrigin(frontendURL), twinLocalOrigin(serverURL)], ...extraOrigins].filter(
      Boolean,
    ) as string[],
  ),
)

function getDatabase() {
  const uri = process.env.DATABASE_URI?.trim()
  const onVercel = process.env.VERCEL === '1'

  const isPostgres =
    !!uri &&
    (uri.startsWith('postgres') || uri.startsWith('postgresql')) &&
    /^postgres(ql)?:\/\//i.test(uri)

  const isSqliteFile = !!uri && (uri.startsWith('file:') || uri === ':memory:')

  if (isPostgres && uri) {
    return postgresAdapter({
      pool: {
        connectionString: uri,
      },
      // Turn off with PAYLOAD_DATABASE_PUSH=false after adopting SQL migrations.
      push: process.env.PAYLOAD_DATABASE_PUSH !== 'false',
    })
  }

  if (isSqliteFile && uri) {
    return sqliteAdapter({
      client: { url: uri },
    })
  }

  if (onVercel) {
    throw new Error(
      'DATABASE_URI on Vercel must be a real PostgreSQL URL (postgresql://…) from Neon, Vercel Postgres, etc. SQLite file paths do not persist on serverless.',
    )
  }

  if (uri && !isSqliteFile) {
    throw new Error(
      `Invalid DATABASE_URI: expected postgresql://… or sqlite file:/:memory:, not "${uri.slice(0, 48)}${uri.length > 48 ? '…' : ''}". Remove placeholders like your_postgres_url_here from env.`,
    )
  }

  return sqliteAdapter({
    client: {
      url: `file:${path.resolve(dirname, '../payload.db')}`,
    },
  })
}

export default buildConfig({
  sharp,
  serverURL,
  admin: {
    user: Users.slug,
    // Avoid React hydration warnings when browser extensions (e.g. Grammarly) inject attributes on <body>
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: '— Honeymoon Boutique CMS',
    },
  },
  collections: [Pages, Destinations, Experiences, Media, Testimonials, Users],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: getDatabase(),
  cors: trustedOrigins,
  csrf: trustedOrigins,
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      clientUploads: true,
      enabled: Boolean(process.env.UPLOADTHING_TOKEN?.trim()),
      options: {
        acl: 'public-read',
        token: process.env.UPLOADTHING_TOKEN || '',
      },
    }),
    seoPlugin({
      collections: ['pages', 'destinations', 'experiences'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title} — Honeymoon Boutique`,
      generateDescription: ({ doc }) => doc?.excerpt as string || '',
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      redirectRelationships: ['pages'],
    }),
    revalidateFrontendPlugin(),
  ],
})
