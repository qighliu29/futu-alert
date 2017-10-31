const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

module.exports = {
    entry: path.join(PATHS.src, 'app.js'),
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [{
            test: /\.pug$/,
            use: 'pug-loader',
        }, {
            test: /\.(js|vue)$/,
            enforce: 'pre',
            include: [PATHS.src],
            use: {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'), // eslint-disable-line global-require
                }
            }
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'postcss-loader',
                            'sass-loader',
                        ]
                    }
                }
            }
        }],
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Required
            inject: false,
            template: path.join(PATHS.src, 'index.pug'),

            // Optional
            appMountId: 'app',
            injectExtras: {
                // CSS
                head: [
                    'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/flatly/bootstrap.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                ],
                // scripts
                body: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.runtime.min.js',
                ]
            }
        })
    ]
};