<template>
  <div>
    <input type="button" value="发送" @click="send" />
  </div>
</template>

<script>
import ElNotice from "@/components/Notice/ElNotice.vue";

export default {
  methods: {
    send() {
      this.$create(ElNotice, {
        title: "提示",
        message: "发送失败，请检查网络",
        duration: 3000
      }).show();
    }
  }
};
</script>


