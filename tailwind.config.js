/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'ebony':'#323232' // Add any custom colors here
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-pattern': "url('https://th.bing.com/th/id/R.21f1a301c64fa08c773ba79e9dbfb24e?rik=apQpyOLEIExj%2bw&riu=http%3a%2f%2fgamification-research.org%2fwp-content%2fuploads%2f2017%2f11%2fVirtual-Money-768x432.jpg&ehk=FCl0kDQAWkOdqaDmwDqyVv8B0doW2LjaHFRTPSX5x8M%3d&risl=&pid=ImgRaw&r=0')",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
