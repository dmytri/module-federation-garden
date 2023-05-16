import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'app',
			remotes: {
				remoteApp:
					'http://mainserver.reactmf.local.demo.garden/remoteEntry.js?version=^1.0.0'
			},
			shared: ['react', 'react-dom']
		})
	],
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false
	}
})
