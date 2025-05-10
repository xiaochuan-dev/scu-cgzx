const { defineConfig } = require('rollup');
const ts = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');

module.exports = defineConfig({
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'iife'
  },
  plugins: [
    ts(),
    terser()
  ]
});
