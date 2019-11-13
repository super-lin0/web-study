// express
const express = require('express')
// vue
const Vue = require('vue')
// vue-server-renderer
const {createRenderer} = require('vue-server-renderer')

// 创建express实例
const app = express();

// 创建渲染器
const renderer = createRenderer();

// 待渲染页面
const vm = new Vue({
    data: {name:'开课吧'},
    template:'<div>{{name}}</div>'
})

// express路由
app.get('*', async (req, res) => {
    req.url
    const html = await renderer.renderToString(vm);
    res.send(html);
})

app.listen(3000,() => {
    console.log('渲染服务器启动成功！');
    
})