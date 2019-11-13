// 挂载创建vue实例: 将来在浏览器执行
import {createApp} from './main'

// 创建vue实例
const {app, router} = createApp()

// 路由就绪，执行挂载（激活过程）
router.onReady(() => {
    app.$mount('#app')
})