/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: '#0099cc',
        azulClaro: '#0088CC',
        rojo: '#ff4d4d',
        pagado: '#00ff99',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
