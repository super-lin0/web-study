<template>
  <div>
    <h3 id="message">{{ message }}</h3>用户名:
    <input id="username" type="text" v-model="username" />
    密码：
    <input type="password" name id="password" v-model="password" />
    <button @click="changeMsg">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      username: "",
      password: ""
    };
  },
  created() {
    this.message = "未登录";
  },
  methods: {
    changeMsg() {
      this.$store
        .dispatch("user/login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.message = "登录成功";
        })
        .catch(err => {
          this.message = "登录失败:" + err;
        });
    }
  }
};
</script>
