import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, userAccessToken } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:userAccessToken
})
