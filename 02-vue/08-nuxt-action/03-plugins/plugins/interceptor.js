export default ({ $axios, store }) => {
  // 为Axios实例添加一个请求时间监听
  // onRequest 是nuxtjs/axios模块提供的帮助方法
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.Authorization = "Bearer " + store.state.user.token;
    }
    return config;
  });
};
