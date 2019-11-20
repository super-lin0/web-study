<template>
  <div class="k-form-test">
    <k-form :user="user" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input
          type="text"
          v-model="user.username"
          placeholder="请输入用户名"
        />
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
        />
      </k-form-item>
      <k-form-item>
        <button @click="onLogin">提交</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from "vue-property-decorator";

import KInput from "@/components/Form/KInput.vue";
import KFormItem from "@/components/Form/KFormItem.vue";
import KForm from "@/components/Form/KForm.vue";
import User from "@/models/user";

@Component({ components: { KInput, KFormItem, KForm } })
export default class FormTest extends Vue {
  private user: User = { username: "tom", password: "" };
  private rules: object = {
    username: [{ required: true, message: "必填项" }],
    password: [{ required: true, message: "必填项" }]
  };

  onLogin() {
    this.$refs.loginForm.validate(isValid => {
      if (isValid) {
        alert("登录成功");
      } else {
        alert("校验失败");
      }
    });
  }
}
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
