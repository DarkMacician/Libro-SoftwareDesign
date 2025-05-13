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


// export async function getAllBooks(): Promise<Book[]> {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/get_all_book")

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`)
//     }

//     const books = await response.json()
//     return books
//   } catch (error) {
//     console.error("Failed to fetch books:", error)
//     return []
//   }
// }
export async function getAllBooks(): Promise<Book[]> {
  try {
    const response = await fetch("http://127.0.0.1:8000/get_all_book")

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error response: ${errorText}`)
      throw new Error(`Error: ${response.status} - ${errorText}`)
    }

    // Try to parse the response as JSON
    try {
      const books = await response.json()
      return books
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError)
      throw new Error("Invalid JSON response from server")
    }
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
  try {
    const token = getToken();
    if (!token) return false;

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
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to save bookmark:", error);
    return false;
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

// Function to get bookmark
export async function getBookmark(bookId: number): Promise<number | null> {
  try {
    const token = getToken();
    if (!token) return null;

    // Truyền token và book_id qua query string
    const url = `http://127.0.0.1:8000/bookmark?token=${encodeURIComponent(token)}&book_id=${bookId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.status === "success") {
      return data.page;
    }
    return null;
  } catch (error) {
    console.error("Failed to get bookmark:", error);
    return null;
  }
}

// Function to search books
export async function searchBooks(title: string): Promise<Book[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/search?title=${encodeURIComponent(title)}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const books = await response.json()
    return books
  } catch (error) {
    console.error("Failed to search books:", error)
    return []
  }
}
