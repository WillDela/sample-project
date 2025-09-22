import { GoogleGenerativeAI } from '@google/generative-ai'

// Get API key from environment variable
const apiKey = process.env.GOOGLE_AI_API_KEY
if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY environment variable is not set')
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    console.log('Starting image analysis with Gemini...')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Convert file to base64
    console.log('Converting file to base64...')
    const imageData = await fileToGenerativePart(imageFile)

    const prompt = "Analyze this image and describe what you see in detail. Include objects, people, activities, colors, and any other notable features."

    console.log('Sending request to Gemini API...')
    const result = await model.generateContent([prompt, imageData])
    const response = await result.response
    const text = response.text()
    console.log('Received response from Gemini API')
    return text
  } catch (error) {
    console.error('Detailed error analyzing image:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function fileToGenerativePart(file: File) {
  // Convert File to Buffer and then to base64
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64String = buffer.toString('base64')

  return {
    inlineData: {
      data: base64String,
      mimeType: file.type,
    },
  }
}