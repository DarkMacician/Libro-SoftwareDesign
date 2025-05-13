/**
 * Extract the file ID from a Google Drive URL
 * @param url Google Drive URL
 * @returns File ID
 */
export function extractGoogleDriveFileId(url: string): string | null {
    // Pattern for URLs like https://drive.google.com/file/d/{fileId}/view
    const filePattern = /\/file\/d\/([^/]+)/
    // Pattern for URLs like https://drive.google.com/uc?id={fileId}
    const ucPattern = /[?&]id=([^&]+)/
    // Pattern for direct IDs (just the ID string)
    const directIdPattern = /^[a-zA-Z0-9_-]{25,}$/
  
    let match = url.match(filePattern)
    if (match && match[1]) {
      return match[1]
    }
  
    match = url.match(ucPattern)
    if (match && match[1]) {
      return match[1]
    }
  
    // Check if the URL is already just a file ID
    if (directIdPattern.test(url)) {
      return url
    }
  
    return null
  }
  
  /**
   * Convert a Google Drive file URL to a direct download URL
   * @param url Google Drive URL
   * @returns Direct download URL
   */
  export function getGoogleDriveDirectUrl(url: string): string | null {
    const fileId = extractGoogleDriveFileId(url)
    if (!fileId) return null
  
    // Use the export=view parameter which is more reliable for JSON files
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }
  
  /**
   * Get multiple alternative URLs for a Google Drive image
   * This provides fallback options if one format doesn't work
   * @param url Google Drive URL or file ID
   * @returns Array of alternative URLs to try
   */
  export function getGoogleDriveImageUrls(url: string): string[] {
    const fileId = extractGoogleDriveFileId(url) || url
    if (!fileId) return []
  
    return [
      // Standard direct link format
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      // Alternative format with download parameter
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      // Format that sometimes works better for images
      `https://lh3.googleusercontent.com/d/${fileId}`,
      // Another alternative that sometimes works
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    ]
  }
  