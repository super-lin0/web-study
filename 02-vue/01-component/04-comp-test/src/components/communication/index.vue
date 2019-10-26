<template>
  <div class="parent">
    <parent-to-child msg="Hello World" foo="say foo" ref="son"></parent-to-child>
    <child-to-parent @send="sendHandle"></child-to-parent>
    <child1></child1>
    <child2></child2>
    <GrandParent></GrandParent>
    <bus1></bus1>
    <bus2></bus2>
  </div>
</template>

<script>
import ParentToChild from "@/components/communication/ParentToChild.vue";
import ChildToParent from "@/components/communication/ChildToParent.vue";
import Child1 from "@/components/communication/Child1.vue";
import Child2 from "@/components/communication/Child2.vue";
import GrandParent from "@/components/communication/GrandParent.vue";

import Bus1 from "@/components/communication/Bus1.vue";
import Bus2 from "@/components/communication/Bus2.vue";

export default {
  components: {
    ParentToChild,
    ChildToParent,
    Child1,
    Child2,
    GrandParent,
    Bus2,
    Bus1
  },
  mounted() {
    this.$refs.son.xx = "sssss";
    this.$children[0].oo = "abhcjdbjdh";
  },
  methods: {
    sendHandle() {
      alert("父亲发出一声吼：收到了");
    }
  }
};
</script>

<style  scoped>
.parent {
  border: 10px solid gray;
}
</style>