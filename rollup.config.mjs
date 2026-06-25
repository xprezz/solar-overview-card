import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/solar-overview-card.js',
  output: {
    file: 'dist/solar-overview-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    terser({
      format: { comments: false },
      compress: { passes: 2 },
    }),
  ],
};
