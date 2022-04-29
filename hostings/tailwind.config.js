module.exports = {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  variants: {
    tableLayout: ['responsive', 'hover', 'focus'],
  },
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
