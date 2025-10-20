// src/lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Client for fetching data (read-only, can be used client-side)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-19',
  useCdn: true,
})

// Client with token for server-side operations
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pionkkje',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-19',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
})

// Helper for image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}