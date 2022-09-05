import SanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

import env from './sanity-variable'

export const client = SanityClient({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  useCdn: true,
  token: env.token
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source).url()