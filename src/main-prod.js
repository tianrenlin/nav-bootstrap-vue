import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'

// 引入本地数据并注册到vue原型中
import data from '@/assets/data/data.json'
Vue.prototype.$mydata = data
    // 引入本地全局样式
import '@/assets/css/global.less'
// 引入本地全局js
import common from '@/assets/js/common.js'
Vue.prototype.$com = common

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')