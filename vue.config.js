module.exports = {
    publicPath: "./",
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        proxy: {
            '/data': {
                target: 'http://159.226.41.215:8082/aicc/conversion?dataJson=%7B%27appid%27%3A+%27transmit%27%2C+%27userid%27%3A+%27researchGroup1%27%2C+%27type%27%3A+%27message%27%2C+%27sessionid%27%3A+%27test1%27%2C+%27username%27%3A+%27guest1%27%2C+%27agentserviceid%27%3A+%278372b5a4ce2a4d82afdac9386bfd084d%27%2C+%27channel%27%3A+%27GENERAL%27%2C+%27aiid%27%3A+%272c9127ee7598263e0176237144eb0a1d%27%2C+%27msgtype%27%3A+%27text%27%2C+%27orgi%27%3A+%272c9127ee723afd4401725f8ed92b1853%27%2C+%27message%27%3A+%27Anger%27%2C+%27prob_data%27%3A+%270.1%2C0.2%2C0.5%2C0.2%2C0.0%2C0.0%2C0.0%27%2C+%27raw_data%27%3A+%270.3%2C0.5%2C0.8%27%7D',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            },
        },
        host: '0.0.0.0'
    },
}
