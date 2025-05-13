import { type NextRequest, NextResponse } from "next/server"
import { extractGoogleDriveFileId } from "@/lib/google-drive"

export async function GET(request: NextRequest) {
  // Get the URL or ID from the query parameter and decode it
  const urlOrId = decodeURIComponent(request.nextUrl.searchParams.get("url") || "")

  // Remove any recursive /api/image-proxy prefixes
  const cleanUrl = urlOrId.replace(/^\/api\/image-proxy\?url=/, '')

  if (!cleanUrl) {
    return NextResponse.json({ error: "URL or ID parameter is required" }, { status: 400 })
  }

  // Extract file ID if it's a URL, or use directly if it's an ID
  const fileId = extractGoogleDriveFileId(cleanUrl) || cleanUrl

  if (!fileId) {
    return NextResponse.json({ error: "Invalid Google Drive URL or ID" }, { status: 400 })
  }

  try {
    // Try different URL formats that might work
    const urls = [
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    ]

    // Try each URL until one works
    let response = null
    let error = null

    for (const url of urls) {
      try {
        response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "image/*, */*",
            Referer: "https://drive.google.com/",
          },
        })

        if (response.ok) {
          break
        }
      } catch (err) {
        error = err as Error
        continue
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${error?.message || "Unknown error"}` },
        { status: 500 },
      )
    }

    // Get the content type and buffer
    const contentType = response.headers.get("content-type") || "image/jpeg"
    const buffer = await response.arrayBuffer()

    // Return the image with proper content type
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Image proxy error:", error)
    return NextResponse.json({ error: `Failed to fetch image: ${(error as Error).message}` }, { status: 500 })
  }
}
