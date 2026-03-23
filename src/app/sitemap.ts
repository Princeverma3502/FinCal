import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fin-cal-theta.vercel.app/?principal=5000000&interestRate=8.5&years=20&extraPayment=0&lumpSumAmount=0&propertyTax=0&insurance=0&taxBracket=30&curr=INR',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}