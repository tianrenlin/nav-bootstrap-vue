import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '@/views/home.vue'),
        meta: { title: '资源导航-TLin', keyword: '资源导航,导航,资源,tlin,TLin', description: '资源导航，没有你找不到，只有你想不到！' }
    },
    {
        path: '*',
        component: () =>
            import ( /* webpackChunkName: "null" */ '@/views/home.vue')
    },
]

const router = new VueRouter({
    routes,
    // 解决当页面滑动到下方时点击进入详情页不在顶部问题
    scrollBehavior: function(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

export default router