import HeroBlockComponent from './HeroBlock'
import FeaturedGridBlockComponent from './FeaturedGridBlock'
import TestimonialsBlockComponent from './TestimonialsBlock'
import CTABlockComponent from './CTABlock'
import ContentBlockComponent from './ContentBlock'
import FormBlockComponent from './FormBlock'
import GalleryBlockComponent from './GalleryBlock'
import StatsBlockComponent from './StatsBlock'

const BLOCK_MAP: Record<string, React.ComponentType<any>> = {
  hero: HeroBlockComponent,
  featuredGrid: FeaturedGridBlockComponent,
  testimonials: TestimonialsBlockComponent,
  cta: CTABlockComponent,
  content: ContentBlockComponent,
  formBlock: FormBlockComponent,
  gallery: GalleryBlockComponent,
  stats: StatsBlockComponent,
}

type Props = {
  blocks: any[]
}

export default function BlockRenderer({ blocks }: Props) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = BLOCK_MAP[block.blockType]
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            return (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 text-sm">
                Unknown block type: <code>{block.blockType}</code>
              </div>
            )
          }
          return null
        }
        return <Component key={block.id || index} {...block} />
      })}
    </>
  )
}
