# 🌸 Honeymoon Boutique — Full Stack CMS

A luxury honeymoon website with **Next.js** frontend + **Payload CMS** backend.  
Every piece of content (text, images, headings, pages, navigation) is editable through the CMS admin panel.

```
project/
├── frontend/   ← Next.js 15 public website (port 3000)
└── payload/    ← Payload CMS 3.0 admin + API (port 3001)
```

---

## ⚡ Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Two terminal windows

---

### Step 1 — Set up Payload CMS

```bash
cd project/payload

# Install dependencies
npm install

# The .env file is already created with defaults
# (change PAYLOAD_SECRET in production!)

# Start the CMS
npm run dev
```

Open **http://localhost:3001/admin**

On first run, Payload will ask you to create an admin user.  
Set up your email + password, then you're in!

---

### Step 2 — Seed Initial Content (Optional but recommended)

After the CMS is running and you've created your admin account:

```bash
# In the payload/ directory:
npx tsx src/seed.ts
```

This creates:
- ✅ 6 featured destinations (Santorini, Maldives, Bali, etc.)
- ✅ 3 testimonials
- ✅ Homepage with all blocks pre-configured
- ✅ Header navigation

**Or** create content manually through the admin UI.

---

### Step 3 — Set up the Frontend

```bash
# In a NEW terminal:
cd project/frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Open **http://localhost:3000** — your website is live!

---

## 🎛️ How the CMS Connection Works

```
Payload CMS (port 3001)          Next.js Frontend (port 3000)
      │                                    │
      │  REST API at /api/*                │
      │◄──────────────────────────────────►│
      │                                    │
  Collections:                      src/lib/payload.ts
  - pages                           (fetches all data)
  - destinations                          │
  - experiences                           ▼
  - testimonials                   BlockRenderer.tsx
  - media                          (maps blockType → component)
                                          │
  Globals:                                ▼
  - header                         HeroBlock, FeaturedGridBlock,
  - footer                         TestimonialsBlock, CTABlock...
  - site-settings
```

---

## 📝 What You Can Edit in the CMS

### Pages → Layout Blocks
Go to **Collections → Pages → Home** and you'll see a `Layout` field.  
Each block is a section of the page:

| Block | What it controls |
|-------|-----------------|
| **Hero** | Big headline, subheadline, background image, CTA buttons |
| **Featured Grid** | Which destinations appear on the homepage |
| **Testimonials** | Customer quotes section |
| **CTA** | Full-width call-to-action banner |
| **Stats** | Numbers like "2,400+ Honeymoons Planned" |
| **Content** | Rich text, images, two-column layouts |
| **Gallery** | Image grid/masonry |
| **Form** | Contact/enquiry form |

### Collections
- **Destinations** — Each destination has: name, slug, tagline, description (rich text), hero image, gallery, highlights, price, region
- **Experiences** — Activities and experiences linked to destinations
- **Testimonials** — Customer reviews with photo, rating, location
- **Media** — All images, with automatic resizing (thumbnail/card/hero)

### Globals (sitewide)
- **Header** — Logo text, navigation links, CTA button
- **Footer** — Footer columns, social links, copyright
- **Site Settings** — Site name, tagline, contact info

### SEO (on Pages, Destinations, Experiences)
Each content item has an **SEO** tab:
- Meta title
- Meta description  
- OG image (for social sharing)

### Forms
Go to **Forms** collection to create enquiry forms.  
Fields: text, email, textarea, select, checkbox, number.  
Then add a **Form Block** to any page and select your form.  
Submissions appear in **Form Submissions**.

---

## 🔄 Making Content Changes

1. Open http://localhost:3001/admin
2. Navigate to any collection or page
3. Edit the content
4. Click **Save**
5. The frontend at http://localhost:3000 refreshes automatically (ISR with 60s revalidation)

**For instant preview**: In Next.js dev mode, changes appear immediately on hard reload.

---

## 🏗️ Project Structure

### Frontend (`/frontend/src/`)

```
app/
├── layout.tsx          ← Root layout (header + footer)
├── page.tsx            ← Homepage (fetches 'home' slug from CMS)
└── [slug]/page.tsx     ← All other CMS pages

lib/
└── payload.ts          ← All API calls to Payload

components/
├── layout/
│   ├── Header.tsx      ← Renders header global data
│   └── Footer.tsx      ← Renders footer global data
└── blocks/
    ├── BlockRenderer.tsx      ← Maps blockType → component
    ├── HeroBlock.tsx
    ├── FeaturedGridBlock.tsx
    ├── TestimonialsBlock.tsx
    ├── CTABlock.tsx
    ├── StatsBlock.tsx
    ├── ContentBlock.tsx
    ├── GalleryBlock.tsx
    └── FormBlock.tsx
```

### Payload CMS (`/payload/src/`)

```
payload.config.ts        ← Main config (collections, plugins, DB)

collections/
├── Pages.ts             ← Pages with layout blocks
├── Destinations.ts
├── Experiences.ts
├── Media.ts
├── Testimonials.ts
└── Users.ts

blocks/
├── HeroBlock.ts
├── FeaturedGridBlock.ts
├── TestimonialsBlock.ts
├── CTABlock.ts
├── StatsBlock.ts
├── ContentBlock.ts
├── GalleryBlock.ts
└── FormBlock.ts

globals/
├── Header.ts
├── Footer.ts
└── SiteSettings.ts

app/(payload)/
├── admin/[[...segments]]/   ← Admin UI
└── api/[...slug]/           ← REST API routes
```

---

## 🌐 Adding a New Page

1. **In Payload admin**: Collections → Pages → Create New
2. Set `slug` to e.g. `about`
3. Add blocks from the Layout field
4. Set Status to **Published**
5. Visit **http://localhost:3000/about**

The frontend dynamically handles any slug — no code changes needed!

---

## ➕ Adding a New Block Type

### 1. Define the block in Payload (`payload/src/blocks/`)
```ts
export const QuoteBlock: Block = {
  slug: 'quote',
  fields: [
    { name: 'text', type: 'textarea', required: true },
    { name: 'author', type: 'text' },
  ],
}
```

### 2. Register it in the Pages collection
```ts
// payload/src/collections/Pages.ts
import { QuoteBlock } from '../blocks/QuoteBlock'
// ... add to blocks array in the layout field
```

### 3. Create the frontend component
```tsx
// frontend/src/components/blocks/QuoteBlock.tsx
export default function QuoteBlock({ text, author }: any) {
  return <blockquote>...</blockquote>
}
```

### 4. Register in BlockRenderer
```ts
// frontend/src/components/blocks/BlockRenderer.tsx
import QuoteBlock from './QuoteBlock'
const BLOCK_MAP = {
  // ...
  quote: QuoteBlock,
}
```

---

## 🔧 Production Deployment

### Environment Variables

**Payload (`payload/.env`):**
```
PAYLOAD_SECRET=<long-random-string>
DATABASE_URI=<your-postgres-url>  # switch from SQLite
FRONTEND_URL=https://yourdomain.com
```

**Frontend (`frontend/.env.local`):**
```
NEXT_PUBLIC_PAYLOAD_URL=https://cms.yourdomain.com
PAYLOAD_API_URL=https://cms.yourdomain.com/api
```

### Switching from SQLite to PostgreSQL
```bash
npm install @payloadcms/db-postgres
```
Update `payload.config.ts` to use `postgresAdapter`.

---

## 🐛 Troubleshooting

**Frontend shows fallback content (no CMS data)**  
→ Make sure Payload is running on port 3001 first

**Images not loading**  
→ Check `NEXT_PUBLIC_PAYLOAD_URL` in `frontend/.env.local`

**Admin panel blank**  
→ Run `npm run generate:types` in the payload directory

**Form submission fails**  
→ Check CORS in `payload.config.ts` — add your frontend URL

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| CMS | Payload CMS 3.0 |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Fonts | Cormorant Garamond + Jost |
| SEO | @payloadcms/plugin-seo |
| Forms | @payloadcms/plugin-form-builder |
