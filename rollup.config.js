import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";

// delete old typings to avoid issues
require('fs').unlink('dist/index.d.ts', (err) => {});
export default [
	{
		input: 'src/autoMapper.ts',
		output: [
            {
                file: pkg.main,
                format: 'cjs'
            },
            {
                file: pkg.module,
                format: 'es'
            },
            {
                file: pkg.browser,
                format: 'iife',
                name: 'AutoMapper'
            }
        ],
        external: [
            ...Object.keys(pkg.dependencies || {})
        ],
		plugins: [
			typescript({
                typescript: require('typescript'),
            }),
            terser()
		]
	}
];