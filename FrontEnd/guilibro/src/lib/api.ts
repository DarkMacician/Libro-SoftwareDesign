import Cookies from "js-cookie"

// Book type definition based on your API response
export interface Book {
  title: string
  author: string
  genre: string[]
  url: string
  book_id: number
}

// Function to get token from cookies
function getToken(): string | undefined {
  return Cookies.get("access_token")
}

// Function to fetch all books
export async function getAllBooks(): Promise<Book[]> {
  try {
    const response = await fetch("http://127.0.0.1:8000/get_all_book")

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const books = await response.json()
    return books
  } catch (error) {
    console.error("Failed to fetch books:", error)
    return []
  }
}

export async function deleteBook(bookId: number): Promise<boolean> {
  const token = getToken()
  if (!token) return false

  try {
    const response = await fetch(`http://127.0.0.1:8000/admin/delete_book`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        book_id: bookId,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to delete book:", error)
    return false
  }
}

// Function to add a new book (admin only)
export async function addBook(bookData: Omit<Book, "book_id">): Promise<Book | null> {
  const token = getToken()
  if (!token) return null

  try {
    const response = await fetch("http://127.0.0.1:8000/admin/add_book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookData,
        token,
      }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to add book:", error)
    return null
  }
}

// Function to bookmark a page (user only)
export async function bookmarkPage(bookId: number, page: number): Promise<boolean> {
  const token = getToken()
  if (!token) return false

  try {
    const response = await fetch("http://127.0.0.1:8000/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        book_id: bookId,
        page,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to bookmark page:", error)
    return false
  }
}

// Function to get book details
export async function getBookDetails(bookId: number): Promise<Book | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/view_detail?book_id=${bookId}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch book details:", error)
    return null
  }
}
