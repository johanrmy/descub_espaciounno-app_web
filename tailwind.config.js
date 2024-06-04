/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'descub_pr': 
        {  
          DEFAULT: '#CB2C2A',
          50: '#F1BCBC',  
          100: '#EEABAB',  
          200: '#E78A89',  
          300: '#E06967',  
          400: '#D94745',  
          500: '#CB2C2A',  
          600: '#9D2220',  
          700: '#6E1817',  
          800: '#400E0D',  
          900: '#110404',  
          950: '#000000'},
        'descub_sc': {
          DEFAULT: '#FEA82F',
          50: '#FFF4E6',
          100: '#FFECD1',
          200: '#FFDBA9',
          300: '#FECA80',
          400: '#FEB958',
          500: '#FEA82F',
          600: '#F48F01',
          700: '#BC6E01',
          800: '#844D01',
          900: '#4C2D00',
          950: '#301C00'},
        'unno_pr': {
          DEFAULT: '#004A40',
          50: '#03FFDD',
          100: '#00EDCD',
          200: '#00C4AA',
          300: '#009C87',
          400: '#007363',
          500: '#004A40',
          600: '#00120F',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'},
        'unno_sc': {
          DEFAULT: '#DDFFF7',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#DDFFF7',
          600: '#A5FFEA',
          700: '#6DFFDD',
          800: '#35FFCF',
          900: '#00FCC0',
          950: '#00E0AB'},
        'dark_ud': {
          DEFAULT: '#F5F5F5',
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#D9D9D9',
          300: '#BDBDBD',
          400: '#A1A1A1',
          500: '#858585',
          600: '#696969',
          700: '#4D4D4D',
          800: '#2F2F2F',
          900: '#151515',
          950: '#070707'},
      },
      fontFamily:{
        nsans : ['Noto Sans'],
        roboto : ['Roboto']
      },
      transitionProperty: {
        'height' : 'height'
      },
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      textStrokeColor: {
        'black': '#000000', 
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1': {
          '-webkit-text-stroke-width': '1px',
          'text-stroke-width': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke-width': '2px',
          'text-stroke-width': '2px',
        },
        '.text-stroke-3': {
          '-webkit-text-stroke-width': '3px',
          'text-stroke-width': '3px',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-color': '#000000',
          'text-stroke-color': '#000000',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

