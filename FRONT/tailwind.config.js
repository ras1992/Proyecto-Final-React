/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondoAzul': "url('/otro2.svg')",
        'fondoAzulSmall': "url('/otro3.png')",
        'bg-login': "url('../img/nav/bg-login.avif')",
        'contact': "url('../img/contacts/wave.svg')",
        'footerBg': 'url(../img/footer/footerbg.png)',
        'footerBgXl': 'url(../img/footer/bg1024.png)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans'],
        lobster: ['Lobster', 'cursive'],
      },
    },
    screens: {
      "2xl": { max: "1535px" },    // => @media (max-width: 1535px) { ... }        

      xll: { max: "1400px" },
      // => @media (max-width: 1275px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1275px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "375px" },
      // => @media (max-width: 280px) { ... }

      xxs: { max: "280px" },
      // => @media (max-width: 280px) { ... }

      //xs: { max: "479px" },        // => @media (max-width: 479px) { ... } galaxy fold 280px
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}