import { NextRequest, NextResponse } from 'next/server'
import { analyzeImage } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')

    // Check if API key is available
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error('GOOGLE_AI_API_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    console.log('File received:', file.name, file.type, file.size)

    const analysis = await analyzeImage(file)
    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze image' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API route is working' })
}