import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'itnvs0vu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-10-11',
  useCdn: true,
})

export const imageUrl = (image, width = 1200) => image?.asset?.url ? `${image.asset.url}?w=${width}&auto=format` : null
