var path = require('path');
var webpack = require('webpack');

var config = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/only-dev-server',
        './app/Resources/js/app.js',
    ],
    output: {
        path: path.join(__dirname, 'web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://127.0.0.1:3000/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test    : /\.(js|jsx)$/,
                exclude : /node_modules/,
                loader  : 'babel',
                query   : {
                    cacheDirectory : true,
                    plugins        : ['transform-runtime'],
                    presets        : ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};

module.exports = config;
