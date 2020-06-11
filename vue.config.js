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
        // 开发阶段
        config.when(process.env.NODE_ENV === 'development', config=>{
            // 加载app节点并清空入口文件，再加载对应的入口文件
            config.entry('app').clear().add('./src/main.js')
            // title配置
            config.plugin('html').tap(args=>{
                args[0].isProd=false
                return args
            })
        })
        // 发布阶段
        config.when(process.env.NODE_ENV === 'production', config=>{
            // 加载app节点并清空入口文件，再加载对应的入口文件
            config.entry('app').clear().add('./src/main-prod.js')
            // 配置externals加载外部CDN，注意引入时的大小写要与此处的一致
            config.set('externals',{
                vue: 'Vue',
                lodash: '_',
                'bootstrap-vue': 'BootstrapVue',
                'bootstrap-vue-icons': 'IconsPlugin',
            })
        })
    }
}