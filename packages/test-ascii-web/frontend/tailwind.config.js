/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // To disable "sticky hover" on mobile
  // https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-3630717
  future: {
    hoverOnlyWhenSupported: true,
  },
}

