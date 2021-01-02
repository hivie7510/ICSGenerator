const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    optimization: {
        usedExports: true
    },
    plugins: [new CleanWebpackPlugin()]
}
