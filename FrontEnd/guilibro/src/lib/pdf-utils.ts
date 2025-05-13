import * as pdfjsLib from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api"

// Set up the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

// Cache for loaded PDFs
const pdfCache: Record<string, PDFDocumentProxy> = {}

/**
 * Loads a PDF document from a URL with caching
 */
export async function loadPDF(url: string): Promise<PDFDocumentProxy> {
  // Check if the PDF is already in the cache
  if (pdfCache[url]) {
    return pdfCache[url]
  }

  try {
    const loadingTask = pdfjsLib.getDocument(url)
    const pdf = await loadingTask.promise

    // Store in cache
    pdfCache[url] = pdf

    return pdf
  } catch (error) {
    console.error("Error loading PDF:", error)
    throw new Error("Failed to load PDF document")
  }
}

/**
 * Cleans up a PDF document from the cache
 */
export function cleanupPDF(url: string): void {
  if (pdfCache[url]) {
    pdfCache[url].destroy().catch(console.error)
    delete pdfCache[url]
  }
}
