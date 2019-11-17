<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        商品列表
      </h1>
      <li v-for="good in goods" :key="good.id">
        <nuxt-link :to="`/detail/${good.id}`">
          <span>{{ good.text }}</span
          ><span>{{ good.price }}</span>
        </nuxt-link>
      </li>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },

  // data() {
  //   return {
  //     goods: [
  //       { id: 1, text: "Web全栈架构师", price: 8999 },
  //       { id: 2, text: "Python全栈架构师", price: 8999 }
  //     ]
  //   };
  // }

  async asyncData({ $axios, error }) {
    const { ok, goods } = await $axios.$get("/api/goods");
    if (ok) {
      return { goods };
    }

    error({ statusCode: 400, message: "查询数据失败" });
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
