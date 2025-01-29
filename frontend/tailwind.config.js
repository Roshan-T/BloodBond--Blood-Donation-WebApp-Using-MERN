/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(198, 13, 0, 1)", // Equivalent to Color.fromARGB(255, 198, 13, 0)
        lightRed: "rgba(252, 226, 226, 1)", // Equivalent to Color.fromARGB(255, 252, 226, 226)
        accent: "#ff4701", // Equivalent to Color(0xffff4701)
        error: "#e61f34", // Equivalent to Color(0xffe61f34)
        success: "green", // Equivalent to Colors.green
        black: "#000000", // Equivalent to Color(0xff000000)
        white: "#ffffff", // Equivalent to Color(0xffffffff)
        grey: "grey", // Equivalent to Colors.grey
        textField: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
