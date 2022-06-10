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
        primary: '#1D4ED8',
        redd: '#fd0304'
      },
      backgroundImage: {
        'banner': "url('/src/assets/banner.jpg')",
        'cate-1': "url('/src/assets/cate-1.jpg')",
        'cate-2': "url('/src/assets/cate-2.jpg')",
      }
    },
  },
  plugins: [],
}