import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get the URL from the query parameter
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Fetch the content from the provided URL
    const response = await fetch(url, {
      headers: {
        // Add headers to help bypass restrictions
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://drive.google.com/",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch content: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    // Get the content type
    const contentType = response.headers.get("content-type") || "application/json"

    // If it's JSON, parse and return it
    if (contentType.includes("application/json")) {
      const data = await response.json()
      return NextResponse.json(data)
    }

    // For other content types, return as text
    const text = await response.text()
    return new NextResponse(text, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: `Failed to fetch content: ${errorMessage}` }, { status: 500 })
  }
}
