module.exports = {
    entry: './public/index.js',
    output: {
        path: __dirname,
        filename: './dist/bundle_' + Date.now() + '.js',
        library: 'zoomNdrag'
    },
    mode: 'production'
};