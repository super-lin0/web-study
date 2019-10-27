<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="errors" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      // 输入项标签
      type: String,
      default: ""
    },
    name: {
      // 字段名
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const value = this.form.value[this.name];
      const rules = this.form.rules[this.name];

      // 创建Schema实例
      const schema = new Schema({
        [this.name]: rules
      });

      // 校验
      return schema.validate({ [this.name]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
.errors {
  color: red;
}
</style>