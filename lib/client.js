import SanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

import env from './sanity-variable'

export const client = new SanityClient({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  useCdn: true,
  token: env.token
})

export const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)