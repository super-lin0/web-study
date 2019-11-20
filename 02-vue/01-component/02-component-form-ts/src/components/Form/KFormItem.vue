<template>
  <div class="k-form-item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from "vue-property-decorator";
import Schema from "async-validator";

@Component
export default class KFormItem extends Vue {
  @Prop({ type: String, default: "" })
  private label!: string;

  @Prop({ type: String })
  private prop!: string;

  @Inject() readonly form!: any;

  private error: string = "";

  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  }

  validate() {
    // 获取当前校验规则和当前值
    const rules = this.form.rules[this.prop];
    const value = this.form.user[this.prop];
    // 创建Schema实例
    const schema = new Schema({
      [this.prop]: rules
    });

    // 使用该实例执行校验
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

.error {
  color: red;
}
</style>
