import type { Metadata } from 'next'
import './globals.css'
import { getHeader, getFooter, getSiteSettings } from '@/lib/payload'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings()
    return {
      title: {
        default: settings.siteName || 'The Honeymoon Boutique',
        template: `%s — ${settings.siteName || 'The Honeymoon Boutique'}`,
      },
      description: settings.siteTagline || 'Bespoke luxury honeymoon experiences',
    }
  } catch {
    return {
      title: { default: 'The Honeymoon Boutique', template: '%s — The Honeymoon Boutique' },
      description: 'Bespoke luxury honeymoon experiences',
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let headerData = null
  let footerData = null

  try {
    ;[headerData, footerData] = await Promise.all([getHeader(), getFooter()])
  } catch {
    // CMS might not be running yet, render with defaults
  }

  return (
    <html lang="en">
      <body>
        <Header data={headerData} />
        <main>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  )
}
