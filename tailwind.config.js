module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'mobile': {'min': '100px', 'max': '800px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1480px',
      // => @media (min-width: 1480px) { ... }

      '2xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
  },
  plugins: [],
};
