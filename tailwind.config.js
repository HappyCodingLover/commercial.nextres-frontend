const colors = require('tailwindcss/colors')

const safeList = []

safeList.push({
  pattern: /(text|bg|ring|border)-(blue|sky|gray|white|green|red|yellow|purple')-(100|200|300|400|500|600|700|800|900)/,
  variants: ['lg', 'hover', 'focus', 'lg:hover', 'dark', 'md'],
})

safeList.push({ pattern: /rounded-(full|lg)/ })

safeList.push({ pattern: /(size|font|text)-(sm|md|lg)/ })

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  safelist: safeList,
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      ...colors,
      'shade-blue': '#004C8E',
    },
    fontFamily: {
      sans: ['work-sans'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
