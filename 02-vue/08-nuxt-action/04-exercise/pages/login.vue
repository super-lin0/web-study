<template>
  <div>
    <h1>登录</h1>
    <el-input v-model="user.username"></el-input>
    <el-input type="password" v-model="user.password"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", this.user).then(ok => {
        if (ok) {
          const redirect = this.$route.query.redirect || "/";
          this.$router.push(redirect);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
