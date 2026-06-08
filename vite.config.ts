import { defineConfig } from 'vite';
import preloadPlugin from 'vite-preload/plugin';
import config from './config';

export default defineConfig({
    clearScreen: false,
    server: {
        allowedHosts: true,
        proxy: {
            '^/api/matchmake/.*': {
                target: `http://localhost:${config.multiplayer.port}/matchmake/`,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/matchmake/, ''),
            },
            '/api': {
                target: `ws://localhost:${config.multiplayer.port}`,
                ws: true,
                rewriteWsOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        }
    },
    plugins: [
        preloadPlugin()
    ],
    build: {
        chunkSizeWarningLimit: 1000,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [{ name: "react-three-fiber", test: /@react-three\/fiber/ }, { name: "tesseract", test: /tesseract/ }, { name: "vendor", test: /node_modules/ }]
                }
            }
        }
    }
});