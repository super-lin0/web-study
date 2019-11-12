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
      <template v-else>
        <router-link :to="resolvePath(model.path)">{{title}}</router-link>
      </template>
    </div>

    <!-- 5.子树设置base-path -->
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="route in model.children"
        :model="route"
        :key="route.path"
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
    // 新增basePath保存父路由path
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
    },
    title() {
      return this.hasTitle
        ? this.model.meta.title
        : this.model.name
        ? this.model.name
        : this.model.path;
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