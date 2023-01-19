const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/Pan.ts'),
            formats: ['es', 'cjs', 'umd', 'amd'],
            name: 'pan',
            fileName: (format) => `pan.${format}.js`
        },
        rollupOptions: {
            output: {
                globals: {
                }
            }
        },
        target: 'es2015',
        sourceMap: true
    }
});
