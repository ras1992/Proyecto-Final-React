/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondoAzul': 'url(/otro2.svg)',
        'bg-login': 'url("./public/img/bg-login.avif")',
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

      xl: { max: "1279px" },
      // => @media (max-width: 1275px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "280px" },
      // => @media (max-width: 280px) { ... }
      
      //xs: { max: "479px" },        // => @media (max-width: 479px) { ... } galaxy fold 280px
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}