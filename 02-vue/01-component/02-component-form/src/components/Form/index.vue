<template>
  <div>
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" placeholder="请输入用户名"></k-input>
      </k-form-item>

      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" type="password"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="onLogin">提交</button>
      </k-form-item>
    </k-form>

    <!-- .sync和v-model有什么区别 -->
    {{model}}
  </div>
</template>

<script>
import KFormItem from "@/components/Form/KFormItem.vue";
import KInput from "@/components/Form/KInput.vue";
import KForm from "@/components/Form/KForm.vue";

export default {
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "用户名不能为空" }],
        password: [{ required: true, message: "密码不能为空" }]
      }
    };
  },
  components: {
    KFormItem,
    KInput,
    KForm
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate(isValidate => {
        if (isValidate) {
          alert("请求登录");
        } else {
          alert("校验失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>