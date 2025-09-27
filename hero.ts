import { heroui } from '@heroui/react'

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          50: '#e9ecf9',
          100: '#c0c7f0',
          200: '#97a2e6',
          300: '#6d7ddc',
          400: '#4458d2',
          500: '#031D91',
          600: '#021773',
          700: '#021155',
          800: '#010b38',
          900: '#00051b',

          DEFAULT: '#031D91',
          foreground: '#ffffff',
        },
        secondary: {
          50: '#ffe5e5',
          100: '#ffbaba',
          200: '#ff8f8f',
          300: '#ff6464',
          400: '#ff3939',
          500: '#ff0000',
          600: '#db0000',
          700: '#b70000',
          800: '#930000',
          900: '#6f0000',
          DEFAULT: '#ff0000',
          foreground: '#ffffff',
        },
      },
    },
  },
})
