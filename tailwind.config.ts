import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			poppins: ['PoppinsB', 'sans-serif'],
			montserrat: ['MontserratB', 'sans-serif'],
		},
		extend: {
			boxShadow: {
				button: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
			},
			screens: {
				'min-400': '401px', // Small screens
				'min-360': '361px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: [require('@xpd/tailwind-3dtransforms')],
}
export default config
