module.exports = {
    publicPath: './',
    pwa: {
        iconPaths: {
            favicon32: 'favicon.png',
            favicon16: 'favicon.png',
            appleTouchIcon: 'favicon.png',
            maskIcon: 'favicon.png',
            msTileImage: 'favicon.png'
        }
    },
    chainWebpack: config => {
        // 配置externals加载外部CDN，注意引入时的大小写要与此处的一致
        config.set('externals', {
            vue: 'Vue',
            lodash: '_',
            'bootstrap-vue': 'BootstrapVue',
            'bootstrap-vue-icons': 'IconsPlugin',
        })
    }
}