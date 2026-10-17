import {createClient} from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-10-13',
  useCdn: true,
})

// Site branding should be read from the API directly so published logo and
// favicon changes do not wait for Sanity's CDN cache to expire.
export const sanityNoCdnClient = sanityClient.withConfig({useCdn: false})

export const imageUrl = (image, width = 1200) => image?.asset?.url ? `${image.asset.url}?w=${width}&auto=format` : null
