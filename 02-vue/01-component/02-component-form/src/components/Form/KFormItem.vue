<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 错误信息展示 -->
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
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
      // 0、获取校验规则和当前值
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];

      //1、创建Schema实例(this指向当前组件实例)
      const schema = new Schema({
        [this.prop]: rules
      });

      // 2、用该实例执行校验
      return schema.validate(
        {
          [this.prop]: value
        },
        errors => {
          if (errors) {
            this.error = errors[0].message;
          } else {
            this.error = "";
          }
        }
      );
    }
  }
};
</script>

<style  scoped>
.error {
  color: red;
}
</style>