import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.vercel.app', // Change to your actual URL
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}