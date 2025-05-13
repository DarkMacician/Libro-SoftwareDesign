/**
 * Creates a proxied URL to bypass CORS restrictions
 * @param url Original URL
 * @returns Proxied URL
 */
export function createProxiedUrl(url: string): string {
    // Use our own API route as the primary proxy
    return `/api/proxy?url=${encodeURIComponent(url)}`
  }
  
  /**
   * Creates a proxied image URL specifically for Google Drive images
   * @param urlOrId Google Drive URL or file ID
   * @returns Proxied image URL
   */
  export function createImageProxyUrl(urlOrId: string): string {
    return `/api/image-proxy?url=${encodeURIComponent(urlOrId)}`
  }
  
  /**
   * Fetches data through a CORS proxy
   * @param url Original URL to fetch
   * @returns Response data
   */
  export async function fetchWithCorsProxy(url: string): Promise<Response> {
    try {
      // Try direct fetch first with improved headers
      const directResponse = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Referer: "https://drive.google.com/",
        },
        mode: "cors",
        credentials: "omit",
      })
  
      if (directResponse.ok) {
        return directResponse
      }
    } catch (error) {
      console.log("Direct fetch failed, trying with proxy...", error)
    }
  
    // If direct fetch fails, try with our API route proxy
    const proxiedUrl = createProxiedUrl(url)
  
    try {
      const proxyResponse = await fetch(proxiedUrl)
      if (proxyResponse.ok) {
        return proxyResponse
      }
      throw new Error(`Proxy fetch failed with status: ${proxyResponse.status}`)
    } catch (error) {
      console.error("Proxy fetch failed:", error)
  
      // If our proxy fails, try with public CORS proxies
      const publicProxies = [
        `https://corsproxy.io/?${encodeURIComponent(url)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        `https://cors-anywhere.herokuapp.com/${url}`,
      ]
  
      for (const proxyUrl of publicProxies) {
        try {
          const response = await fetch(proxyUrl)
          if (response.ok) {
            return response
          }
        } catch (proxyError) {
          console.error(`Proxy ${proxyUrl} failed:`, proxyError)
        }
      }
  
      throw new Error(`All fetch attempts failed`)
    }
  }
  
  /**
   * Fetches JSON data from a URL, handling CORS issues
   * @param url URL to fetch JSON from
   * @returns Parsed JSON data
   */
  export async function fetchJsonWithFallbacks(url: string): Promise<any> {
    try {
      // Try using the CORS proxy
      const response = await fetchWithCorsProxy(url)
      const text = await response.text()
  
      try {
        // Try to parse as JSON
        return JSON.parse(text)
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError)
  
        // If it's not valid JSON, check if it's an array of URLs
        if (text.trim().startsWith("[") && text.trim().endsWith("]")) {
          // Try to clean up and parse the text
          const cleanedText = text.replace(/\r?\n|\r/g, "").trim()
          return JSON.parse(cleanedText)
        }
  
        // If it's not a JSON array, try to extract URLs from the text
        const urlRegex = /(https?:\/\/[^\s"']+)/g
        const matches = text.match(urlRegex)
  
        if (matches && matches.length > 0) {
          return matches
        }
  
        throw new Error("Invalid JSON format and no URLs found in the response")
      }
    } catch (error) {
      console.error("Error fetching with CORS proxy:", error)
      throw error
    }
  }
  