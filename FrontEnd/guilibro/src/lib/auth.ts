import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

// Token interface based on your JWT structure
interface TokenPayload {
  username: string
  role: "admin" | "user"
  exp: number
}

// Cookie name constant
const TOKEN_COOKIE_NAME = "access_token"

// Function to login and store token in cookie
export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    const { access_token } = data

    // Store token in cookie
    Cookies.set(TOKEN_COOKIE_NAME, access_token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return true
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

// Function to logout
export function logout(): void {
  Cookies.remove(TOKEN_COOKIE_NAME)
  window.location.href = "/login"
}

// Get token from cookie
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME)
}

// Decode token and get payload
export function getTokenPayload(): TokenPayload | null {
  const token = getToken()

  if (!token) {
    return null
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token)

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      logout() // Token expired, logout user
      return null
    }

    return decoded
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getTokenPayload() !== null
}

// Check if user is admin
export function isAdmin(): boolean {
  const payload = getTokenPayload()
  return payload !== null && payload.role === "admin"
}

// Get current username
export function getUsername(): string | null {
  const payload = getTokenPayload()
  return payload ? payload.username : null
}

// Function to get authorization header for API requests
export function getAuthHeader(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
