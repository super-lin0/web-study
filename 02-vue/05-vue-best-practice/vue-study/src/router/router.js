import Vue from 'vue'
import Router from 'vue-router'
// import Router from './kvue-router'
import Home from './views/Home.vue'

// 1.应用插件：做了什么？
Vue.use(Router) // use执行了插件install()

// 2.创建Router实例
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
