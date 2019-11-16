<template>
  <div>
    <h1>登录</h1>
    <input v-model="user.username" />
    <input type="password" v-model="user.password" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  layout: "blank",
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
        } else {
          alert("用户名密码错误，请重新输入");
        }
      });
    }
  }
};
</script>

<style scoped></style>
