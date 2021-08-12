module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      transparent: 'transparent',
      selectgray: '#15171A',
      selectgreen: '#30cf43',
      selectgreenhover: '#21a731',
      white: '#ffffff',
      coolgray: '#4B5563'
    }),
    extend: {
      backgroundColor: ['active'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-forms'),
  ],
}


// colors: {
//   transparent: 'transparent',
//   selectgray: '#15171A',
//   selectgreen: '#30cf43',
//   white: '#ffffff'
// }