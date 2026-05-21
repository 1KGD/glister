import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/server/index.ts',
    output: {
        dir: './build',
        format: 'es',
    },
    external: [
        /node_modules/
    ],
    plugins: [
        commonjs(),
        typescript(),
        terser(),
        json()
    ]
};