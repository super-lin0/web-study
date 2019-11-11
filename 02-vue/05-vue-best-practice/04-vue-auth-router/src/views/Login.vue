<template>
  <div>
    <h1>登录</h1>
    <div>
      <input type="text" v-model="username" placeholder="登录" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          this.$router.push({
            path: this.$route.query.redirect || "/"
          });
        })
        .catch(err => alert(err));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>