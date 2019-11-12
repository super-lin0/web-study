<template>
  <div class="hello" @click="$emit('myclick')">
    <h1>{{ msg }}</h1>
    <!-- vuex -->
    <div>
      <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
      <!-- <span>还剩{{$store.getters.left}}个</span> -->
      <p>
        <button @click="add">扔一个</button>
        <button @click="asyncAdd">蓄力扔一个</button>
      </p>
    </div>
    <!-- $attrs -->
    <p>{{$attrs.foo}}</p>
    <!-- ref -->
    <p @click="sayHello">{{xx}}</p>
    <!-- inject -->
    <p>{{foo}}</p>
    <!-- $root -->
    <p>{{$root.bar}}</p>
    <!-- 插槽 -->
    <p>
      <slot></slot>
    </p>
    <p>
      <slot name="content" :foo="foo"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  inject: ["foo"],
  props: {
    msg: String
  },
  data() {
    return {
      xx: "xx"
    };
  },
  created() {
    // 监听事件
    this.$parent.$on("hiBrother", () => {
      console.log("来自兄弟的问候");
    });
  },
  methods: {
    sayHello() {
      this.$parent.$emit("hiBrother");

      this.$root.bar = "barrrrrr";
    },
    add() {
      this.$store.commit("increment");
    },
    asyncAdd() {
      this.$store.dispatch("asyncIncrement").catch(() => {
        alert("投掷失败！没货啦");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
