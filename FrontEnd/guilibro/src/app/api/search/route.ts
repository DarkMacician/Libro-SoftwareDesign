import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get("title")

  if (!title) {
    return NextResponse.json({ error: "Title parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/search?title=${encodeURIComponent(title)}`)
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`)
    }

    const books = await response.json()
    return NextResponse.json(books)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search books" }, { status: 500 })
  }
}
