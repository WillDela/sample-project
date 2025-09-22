'use client'

import { useState } from 'react'
import Button, { FileUpload } from '@/components/Button'

export default function Home() {
  const [showUpload, setShowUpload] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setAnalysis(data.analysis)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Failed to analyze image')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Gemini Image Analyzer
      </h1>

      {!showUpload ? (
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600 mb-6">
            Upload an image to analyze it with Google Gemini AI
          </p>
          <Button onClick={() => setShowUpload(true)}>
            Get Started
          </Button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />

          {selectedFile && !analysis && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
              </Button>
            </div>
          )}

          {analysis && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Analysis Results:</h3>
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: analysis
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n/g, '<br>')
                }}
              />
            </div>
          )}

          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowUpload(false)
                setSelectedFile(null)
                setAnalysis(null)
              }}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}