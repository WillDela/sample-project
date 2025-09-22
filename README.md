# Gemini Image Analyzer

A Next.js web application that uses Google's Gemini 2.0 Pro API to analyze uploaded images.

## Features

- 📷 **Image Upload**: Drag & drop or click to upload images
- 🔍 **AI Analysis**: Powered by Google Gemini 2.0 Pro
- 💫 **Real-time Preview**: See your image before analysis
- 🎨 **Beautiful UI**: Clean design with Tailwind CSS
- ⚡ **Fast**: Built with Next.js 14 and TypeScript

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Get your Gemini API key**:
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Create a new API key
   - Copy the key

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key:
     ```
     GOOGLE_AI_API_KEY=your_actual_api_key_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Upload an image by dragging and dropping or clicking the upload area
2. Click "Analyze Image" to send it to Gemini
3. View the detailed analysis results
4. Upload another image to analyze more

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Gemini 2.0 Pro** - AI image analysis
- **React** - UI components

## API Key Security

- Never commit your API key to version control
- The `.env.local` file is gitignored for security
- Your API key is only used server-side in the API route

## Project Structure

```
├── app/
│   ├── api/analyze/route.ts    # Gemini API integration
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page component
│   └── globals.css             # Global styles
├── Button.tsx                  # Button and FileUpload components
├── .env.local                  # Environment variables (create this)
├── .env.example               # Environment template
└── package.json               # Dependencies
```

## Troubleshooting

- **"Failed to analyze image"**: Check that your API key is correct
- **Build errors**: Make sure all dependencies are installed with `npm install`
- **Upload issues**: Ensure you're uploading image files (JPG, PNG, GIF)