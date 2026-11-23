import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				forest: {
					DEFAULT: 'hsl(var(--forest))',
					deep: 'hsl(var(--forest-deep))',
					soft: 'hsl(var(--forest-soft))'
				},
				moss: {
					DEFAULT: 'hsl(var(--moss))',
					foreground: 'hsl(var(--moss-foreground))',
					bright: 'hsl(var(--moss-bright))',
					soft: 'hsl(var(--moss-soft))'
				},
				ember: {
					DEFAULT: 'hsl(var(--ember))',
					soft: 'hsl(var(--ember-soft))'
				},
				sky: {
					DEFAULT: 'hsl(var(--sky))',
					soft: 'hsl(var(--sky-soft))'
				},
				sand: 'hsl(var(--sand))',
				paper: 'hsl(var(--paper))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'forest-gradient': 'var(--gradient-forest)',
				'moss-gradient': 'var(--gradient-moss)',
				'fade-gradient': 'var(--gradient-fade)'
			},
			boxShadow: {
				elegant: 'var(--shadow-elegant)',
				card: 'var(--shadow-card)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'rise': {
					'0%': { opacity: '0', transform: 'translateY(14px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '0.45' },
					'50%': { opacity: '0.9' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				rise: 'rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
				fade: 'fade 1s ease-out both',
				'pulse-soft': 'pulse-soft 5s ease-in-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
