module.exports = {
    publicPath: "./",
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        proxy: {
            '/data': {
                target: 'http://10.41.5.251:8082/aicc/ShowItemData',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            },
        },
        host: '0.0.0.0'
    },
}
