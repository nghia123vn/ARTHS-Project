/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      colors:{
        "gray-20": "#F8F4EB",
        "main":"#BD3505",
        "mainB":"#F5F5F5"
      },

      backgroundImage: ()=>({
        "gradient-yellowred": "linear-gradient(90deg,#FF616A 0%, #FFC837 100%)",
        // "mobile-home":"url('./assets/HomePageGraphic.png)",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        // evolvetext: "url('./assets/EvolveText.png')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
})