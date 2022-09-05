import SanityClientConstructor from '@sanity/client'
import { ImageUrlBuilder } from 'next-sanity-image'

import env from './sanity-variable'

export const client = new SanityClientConstructor({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  useCdn: true,
  token: env.token
})

export const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)