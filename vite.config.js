import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite'

const viteConfig = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, '', '') };
    return defineConfig({
        define: {
            'process.env': process.env,
        },
        resolve: {
            alias: {
                ws: 'xrpl/dist/npm/client/WSWrapper',
            },
        },
        plugins: [
            tailwindcss(),
        ],
    });
};

export default viteConfig;