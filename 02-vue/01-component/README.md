# 知识点

## 组件化

组件化是 vue 的核心思想，他能提高开发效率，方便重复使用，简化调试步骤，提升整个项目的可维护性，便于多人协同开发

### 组件通信

**父组件 => 子组件**

- 属性 props

```
  // child
  props: {msg: String}

  // parent
  <HelloWorld msg="Hello World">
```

- 特性 \$attrs

```
  // child: 并未在props中声明foo
  <p>{{$attrs.foo}}</p>

  // parent
  <HelloWorld foo="foo">
```

- 引用 refs

```
  // parent
  <HelloWorld ref="hw">

  mounted() {
    this.$refs.hw.xx = "xxx"
  }

  // child
  {{xx}}
  data() {
    xx: "ss"
  }
```

- 子元素\$children

```
  // parent
  this.$children[0].oo = "ssssss";

  // child
  {{oo}}
  data() {
    oo: "xxxx"
  }
```

`Notes`

子元素不保证顺序

**子元素 => 父元素：自定义事件**

```
  // child
  this.$emit("add", good)

  // parent
  <Cart @add="cartAdd($event)"></Cart>
```

**祖先和后代之间**

由于嵌套层级过多，传递 props 不切实际，vue 提供了 provide/inject API 完成该任务

- provide/inject:能够实现祖先和后代传值

```
  // 祖先
  provie() {
    return {
      username: "zhangsan"
    }
  }

  // 后代
  inject: ["username"]
```

**任意两个组件之间的事件：事件总线或 Vuex**

- 事件总线：创建一个 Bus 类负责事件派发、监听和回调管理

```
  // Bus: 事件派发、监听和回调管理
  class Bus{
    constructor(){
      this.callbacks = {}
    }
    $on(name, fn){
      this.callbacks[name] = this.callbacks[name] || []
      this.callbacks[name].push(fn)
    }
    $emit(name, args){
      if(this.callbacks[name]){
        this.callbacks[name].forEach(cb => cb(args))
      }
    }
  }

  // main.js
  Vue.prototype.$bus = new Bus()

  // child1
  this.$bus.$on('foo', handle)

  // child2
  this.$bus.$emit('foo')
```

- 实践中可以用 Vue 来代替 Bus，因为它已经实现了相应的功能
- Vuex: 创建唯一的全局管理者 Store，通过它管理数据并通知组件状态更新

### 插槽

插槽语法是 Vue 实现的内容分发 API，用于复合组件开发，该技术在通用组件库开发中有大量应用

**匿名插槽**

```
  // comp1
  <div>
    <slot></slot>
  </div>

  // parent
  <comp></comp>
```

**具名插槽**

```
  //  将内容分发到子组件指定的位置

  // comp1
  <div>
    <slot name="content"></slot>
  </div>

  // parent
  <div>
    <template v-slot:default></template>
    <template v-slot:content>内容....</template>
  </div>

```

**作用域插槽**

分发内容要用到子组件中的数据

```

  // comp3
  <div>
      <slot :foo="foo"></slot>
  </div>

  // parent
  <Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 -->
    <template v-slot:default="slotProps">来自子组件数据:{{slotProps.foo}} </template>
  </Comp3>

```
