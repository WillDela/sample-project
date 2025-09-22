import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gemini Image Analyzer',
  description: 'Analyze images using Google Gemini AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}