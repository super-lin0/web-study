<template>
  <div class="container">
    <div>
      <h2>商品列表</h2>
      <ul>
        <li v-for="good in goods" :key="good.id">
          <nuxt-link :to="`/detail/${good.id}`">
            <span>{{good.text}}</span>
            <span>¥{{good.price}}</span>
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link to="/detail">没有具体详情的id的情况</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [
        { id: 1, text: "Web全栈架构师", price: 8999 },
        { id: 2, text: "Python全栈架构师", price: 8999 }
      ]
    };
  },
  head() {
    return {
      title: "课程列表",
      // vue-meta利用hid确定要更新meta
      meta: [
        { name: "description", hid: "description", content: "set page meta" }
      ],
      link: [{ rel: "favicon", href: "favicon.ico" }]
    };
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
