import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  sub: string
  role: string
  exp: number
}

export function middleware(request: NextRequest) {
  // Lấy token từ cookies
  const token = request.cookies.get("access_token")?.value

  // Nếu không có token và không phải là trang đăng nhập/đăng ký, chuyển hướng đến trang đăng nhập
  if (!token) {
    const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")

    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  try {
    // Decode token
    const decoded = jwtDecode<JwtPayload>(token)

    // Kiểm tra token hết hạn
    if (decoded.exp * 1000 < Date.now()) {
      // Xóa cookie và chuyển hướng đến trang đăng nhập
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("access_token")
      return response
    }

    // Kiểm tra quyền truy c���p
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
    const isUserRoute = request.nextUrl.pathname === "/" || request.nextUrl.pathname.startsWith("/read")

    // Nếu là admin route nhưng không phải admin, chuyển hướng đến trang chính
    if (isAdminRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Nếu là user route nhưng là admin, chuyển hướng đến trang admin
    if (isUserRoute && decoded.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // Nếu token không hợp lệ, xóa cookie và chuyển hướng đến trang đăng nhập
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("access_token")
    return response
  }
}

// Chỉ áp dụng middleware cho các route cần kiểm tra
export const config = {
  matcher: ["/", "/admin/:path*", "/read/:path*", "/login", "/signup"],
}
