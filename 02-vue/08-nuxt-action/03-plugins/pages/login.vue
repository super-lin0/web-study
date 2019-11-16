<template>
  <div class="container">
    <h2>登录</h2>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">提交</el-button>
      </el-form-item>
    </el-form>
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

<style scoped>
.container {
  flex-direction: column;
}
</style>
