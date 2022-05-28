module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: 'rgb(6, 182, 212)'
      },
      backgroundImage: {
        'banner': "url('/src/assets/banner2.jpg')",
      }
    },
  },
  plugins: [],
}