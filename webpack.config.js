const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

const SCRIPTS = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table',
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.runtime',
    'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.0/vuex',
    // 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.5/howler', // howler has a 'core' dist
    'https://cdnjs.cloudflare.com/ajax/libs/push.js/1.0.5/push',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment',
    'https://cdnjs.cloudflare.com/ajax/libs/d3/4.11.0/d3',
];

const common = {
    entry: path.join(PATHS.src, 'app.js'),
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
        }, {
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
                },
            },
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: [
                            'babel-loader',
                        ],
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'postcss-loader',
                            'sass-loader',
                        ],
                    },
                },
            },
        }],
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        },
        vuex: {
            root: 'Vuex',
            commonjs: 'vuex',
            commonjs2: 'vuex',
            amd: 'vuex',
        },
        howl: {
            root: 'Howl',
            commonjs: 'howl',
            commonjs2: 'howl',
            amd: 'howl',
        },
        push: {
            root: 'Push',
            commonjs: 'push',
            commonjs2: 'push',
            amd: 'push',
        },
        moment: 'moment',
        d3: 'd3',
    },
};

const development = merge([
    common,
    {
        devtool: 'source-map',
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. Good for complex setups.
            historyApiFallback: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',
        },
    },
]);

const production = merge([
    common,
    {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity,
            }),
            new CleanWebpackPlugin([PATHS.dist]),
            new BabelWebpackPlugin(),
        ],
    },
]);

const htmlPage = env => ({
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
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
                ],
                // scripts
                body: env === 'production' ? SCRIPTS.map(url => `${url}.min.js`).concat([
                    'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.5/howler.core.min.js',
                ]) : SCRIPTS.map(url => `${url}.js`).concat([
                    'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.5/howler.js',
                ]),
            },
        }),
    ],
});

// this helps vue drop the development-only code
const nodeEnv = env => ({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
    ],
});

module.exports = env => merge([(env === 'production' ? production : development)].concat([
    htmlPage(env),
    nodeEnv(env),
]));
