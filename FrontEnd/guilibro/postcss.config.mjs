/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {
      theme: {
        extend: {
          colors: {
            red: {
              600: "#e30613", // Màu đỏ chính của sachweb.vn
              700: "#c70512",
            },
          },
        },
      },
    },
  },
}
