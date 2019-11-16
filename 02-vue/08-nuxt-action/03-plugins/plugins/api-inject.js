/**
 * 插件定义,参数一是nuxt上下文对象，参数二是注入函数
 */
export default ({ $axios }, inject) => {
  inject("login", user => {
    return $axios.$post("/api/login", user);
  });
};
