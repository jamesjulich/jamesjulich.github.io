/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			textColor: {
                main: 'rgb(var(--color-text-main) / <alpha-value>)',
				muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
            backgroundColor: {
                main: 'rgb(var(--color-bg-main) / <alpha-value>)',
                muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
				hover: 'rgb(var(--color-bg-hover) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
            borderColor: {
                main: 'rgb(var(--color-border-main) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)'
            },
			stroke: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)'
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('textColor.muted / 100%'),
						'--tw-prose-headings': theme('textColor.main / 100%'),
						'--tw-prose-lead': theme('textColor.main / 100%'),
						'--tw-prose-links': theme('textColor.primary / 100%'),
						'--tw-prose-bold': theme('textColor.main / 100%'),
						'--tw-prose-counters': theme('textColor.main / 100%'),
						'--tw-prose-bullets': theme('textColor.main / 100%'),
						'--tw-prose-hr': theme('borderColor.main / 100%'),
						'--tw-prose-quotes': theme('textColor.muted / 100%'),
						'--tw-prose-quote-borders': theme('borderColor.main / 100%'),
						'--tw-prose-captions': theme('textColor.muted / 100%'),
						'--tw-prose-code': theme('textColor.muted / 100%'),
						'--tw-prose-pre-code': theme('textColor.muted / 100%'),
						'--tw-prose-pre-bg': theme('backgroundColor.muted / 100%'),
						'--tw-prose-th-borders': theme('borderColor.main / 100%'),
						'--tw-prose-td-borders': theme('borderColor.main / 100%')
					},
				}
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
