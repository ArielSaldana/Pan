// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const config = {
    entry: './src/Pan.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: {
            name: 'Pan',
            type: 'umd'
        },
        filename: 'pan.js'
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            }
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: false,
        port: 3001
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}
