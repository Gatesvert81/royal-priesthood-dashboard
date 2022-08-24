/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: {
          "blue" : "#48C5E0"
        },
        faded: {
          "blue" : "rgba(72, 197, 224, 0.27)",
          "black" : "rgba(0,0,0,0.70)",
          "white" : "rgba(225,225,225,0.40)",
        }
      },
      height: {
        "40vh" : "40vh",
        "50vh" : "50vh",
        "60vh" : "60vh",
        "70vh" : "70vh",
        "80vh" : "80vh",
        "90vh" : "90vh",
      },
      gridTemplateColumns: {
        "1fr-2fr" : "1fr 2fr"
      },
      backgroundSize: {
        "50vw" : "50vw",
      }
    },
  },
  plugins: [],
}
