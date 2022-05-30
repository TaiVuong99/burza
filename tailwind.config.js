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
        'cate-1': "url('/src/assets/cate-1.jpg')",
        'cate-2': "url('/src/assets/cate-2.jpg')",
        'burger-1': "url('/src/assets/burger-1.jpg')",
        'burger-2': "url('/src/assets/burger-2.jpg')",
        'burger-3': "url('/src/assets/burger-3.jpg')",
        'burger-4': "url('/src/assets/burger-4.jpg')",
        'pizza-1': "url('/src/assets/pizza-1.jpg')",
        'pizza-2': "url('/src/assets/pizza-2.jpg')",
        'pizza-3': "url('/src/assets/pizza-3.jpg')",
        'pizza-4': "url('/src/assets/pizza-4.jpg')",
      }
    },
  },
  plugins: [],
}