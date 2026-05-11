import { defineConfig } from 'vite';
import preloadPlugin from 'vite-preload/plugin';
import config from './config';

export default defineConfig({
    server: {
        watch: { usePolling: false },
        allowedHosts: true,
        proxy: {
            '^/api/matchmake/.*': {
                target: `http://localhost:${config.multiplayer.port}/matchmake/`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/matchmake/, ''),
            },
            '/api': {
                target: `ws://localhost:${config.multiplayer.port}`,
                ws: true,
                rewriteWsOrigin: true,
            },
        }
    },
    plugins: [
        preloadPlugin()
    ],
});