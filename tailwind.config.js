module.exports = {
  purge: [
    "./dist/index.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      }

    }
  },
  variants: {},
  plugins: [],
}
