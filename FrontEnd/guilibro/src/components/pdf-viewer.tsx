"use client"

import { useState, useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api"

// Set up the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  currentPage: number
  onPageChange: (page: number) => void
  onTotalPagesChange: (totalPages: number) => void
}

export default function PDFViewer({ url, currentPage, onPageChange, onTotalPagesChange }: PDFViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null)
  const [pageRendering, setPageRendering] = useState(false)
  const [pageNumPending, setPageNumPending] = useState<number | null>(null)
  const [scale, setScale] = useState(1.5)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load the PDF document
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url)
        const doc = await loadingTask.promise
        setPdfDoc(doc)
        onTotalPagesChange(doc.numPages)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError("Failed to load PDF document. Please try again later.")
      }
    }

    loadPDF()

    // Cleanup function
    return () => {
      if (pdfDoc) {
        pdfDoc.destroy().catch(console.error)
      }
    }
  }, [url, onTotalPagesChange])

  // Render the page when currentPage changes or when PDF is loaded
  useEffect(() => {
    if (!pdfDoc) return

    // If a page is already rendering, set the pending page number
    if (pageRendering) {
      setPageNumPending(currentPage)
      return
    }

    renderPage(currentPage)
  }, [pdfDoc, currentPage])

  // Check for pending page render when pageRendering changes
  useEffect(() => {
    if (!pageRendering && pageNumPending !== null) {
      renderPage(pageNumPending)
      setPageNumPending(null)
    }
  }, [pageRendering, pageNumPending])

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return

    setPageRendering(true)

    try {
      // Get the page
      const page = await pdfDoc.getPage(pageNum)

      // Set canvas dimensions to match the page
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("Canvas context not available")
      }

      canvas.height = viewport.height
      canvas.width = viewport.width

      // Render the PDF page
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext).promise
      setPageRendering(false)

      // Update current page
      onPageChange(pageNum)
    } catch (err) {
      console.error("Error rendering page:", err)
      setError("Failed to render PDF page. Please try again.")
      setPageRendering(false)
    }
  }

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.2)
    renderPage(currentPage)
  }

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(0.5, prevScale - 0.2))
    renderPage(currentPage)
  }

  if (error) {
    return <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">{error}</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-2">
        <button onClick={handleZoomOut} className="px-3 py-1 bg-[#252525] hover:bg-[#333] text-white rounded-md">
          Zoom Out
        </button>
        <button onClick={handleZoomIn} className="px-3 py-1 bg-[#252525] hover:bg-[#333] text-white rounded-md">
          Zoom In
        </button>
      </div>
      <div className="overflow-auto max-h-[70vh] w-full flex justify-center bg-[#1a1a1a] p-4 rounded-md">
        {!pdfDoc ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <canvas ref={canvasRef} className="shadow-lg"></canvas>
        )}
      </div>
    </div>
  )
}
