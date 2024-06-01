const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'  // html plugin starts to figure out all scripts tags that will be added in html doicument. it takes all the filke names and prehend this with this path eg src = '/container/latest/main.7126hgg.js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // marketing: `marketing@http://localhost:8081/remoteEntry.js`,
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // hosted on aws
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);
