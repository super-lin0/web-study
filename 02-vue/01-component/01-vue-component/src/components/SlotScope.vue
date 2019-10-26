<template>
  <div class="slot">
    <p>插槽</p>
    <h2>匿名插槽</h2>
    <p>
      <slot></slot>
    </p>
    <h2>具名插槽</h2>
    <p>
      <slot name="content"></slot>
    </p>
    <h2>作用域插槽</h2>
    <p>
      <slot name="content1" :foo="foo"></slot>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: "xxx"
    };
  }
};
</script>

<style scoped>
.hello {
  margin: 10px 10px;
  border: 1px solid red;
}
</style>
