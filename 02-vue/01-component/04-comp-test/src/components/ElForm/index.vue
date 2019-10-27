<template>
  <div>
    <h3>El Form 表单</h3>
    <el-form :rules="rules" :value="value" ref="loginForm">
      <el-form-item label="用户名" name="username">
        <el-input type="text" v-model="value.username" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" name="password">
        <el-input type="password" v-model="value.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <button @click="onLogin">提交</button>
      </el-form-item>
    </el-form>
    {{value}}
  </div>
</template>

<script>
import ElInput from "@/components/ElForm/ElInput.vue";
import ElFormItem from "@/components/ElForm/ElFormItem.vue";
import ElForm from "@/components/ElForm/ElForm.vue";

export default {
  components: {
    ElInput,
    ElFormItem,
    ElForm
  },
  data() {
    return {
      value: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入用户密码" }]
      }
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate(isValidate => {
        if (isValidate) {
          alert("请求登录");
        } else {
          alert("校验失败，请检查参数");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>