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
      coolgray: '#181B1F',
      rose: '#F43F5E'
    }),
    extend: {
      backgroundColor: ['active'],
      width: {
        cw: "904px"
      },
      inset: {
        'left-20': '20%',
       }
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