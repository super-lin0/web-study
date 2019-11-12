<template>
  <li v-if="!model.hidden">
    <div @click="toggle">
      <!-- 2.设置icon才显示图标 -->
      <svg-icon v-if="hasIcon" :icon-class="model.meta.icon"></svg-icon>

      <span v-if="isFolder">
        <!-- 3.设置标题才显示 -->
        <span v-if="hasTitle">{{model.meta.title}}</span>
        [{{open ? '-' : '+'}}]
      </span>

       <!-- 4.如果是叶子节点，显示为链接 -->
      <router-link v-else :to="resolvePath(model.path)">{{model.meta.title}}</router-link>
    </div>
    <!-- 5.子树设置base-path：修改key，增加base-path -->
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.path"
        :base-path="resolvePath(model.path)"
      ></item>
    </ul>
  </li>
</template>

<script>
import path from "path";

export default {
  name: "Item", // 必须设置
  props: {
    model: Object,
    basePath: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length;
    },
    hasIcon() {
      return this.model.meta && this.model.meta.icon;
    },
    hasTitle() {
      return this.model.meta && this.model.meta.title;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    // 拼接子路由完整path
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>