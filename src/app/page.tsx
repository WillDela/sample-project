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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <span className="text-2xl text-white">🔍</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Gemini Image Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the power of AI to understand your images with detailed, intelligent analysis
          </p>
        </div>

        {!showUpload ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📸</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Analyze?</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Upload any image and let Google's advanced Gemini AI provide detailed insights about what it sees
                </p>
              </div>
              <Button
                onClick={() => setShowUpload(true)}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Image</h2>
                <p className="text-gray-600">Drop your image below or click to browse</p>
              </div>

              <FileUpload
                onFileSelect={setSelectedFile}
                selectedFile={selectedFile}
              />

              {selectedFile && !analysis && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>🔍</span>
                        <span>Analyze Image</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}

              {analysis && (
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-lg">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">AI Analysis Results</h3>
                  </div>
                  <div
                    className="text-gray-700 prose prose-lg max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: analysis
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-blue-700">$1</em>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/\n/g, '<br>')
                        .replace(/^/, '<p class="mb-4">')
                        .replace(/$/, '</p>')
                    }}
                  />
                </div>
              )}

              <div className="mt-8 flex justify-center space-x-4">
                {analysis && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedFile(null)
                      setAnalysis(null)
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Analyze Another</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUpload(false)
                    setSelectedFile(null)
                    setAnalysis(null)
                  }}
                  className="flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Back to Home</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}