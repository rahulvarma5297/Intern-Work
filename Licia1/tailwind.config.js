/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navyBlue: '#2C4D6D',
        grassGreen: '#0A8E27',
        liciaBlue: '#DAE5F0',
        licalPureBlue: '#3267FF',
        liciaMidBlue: '#59B7FD',
        grayShade: '#92989F',
        lightgrayShade: '#F8F9FA',
      },
      boxShadow: {
        bt: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
