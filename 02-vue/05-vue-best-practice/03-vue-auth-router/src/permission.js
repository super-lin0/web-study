import router from "./router";
import store from "./store";

const whiteList = ["/login", "/home"];

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.

  const hasToken = localStorage.getItem("token");

  // 已登录
  if (hasToken) {
    // 若已登录则没必要显示登录页，重定向至首页
    if (to.path === "login") {
      next({ path: "/" });
    } else {
      // 去其他路由
      // next();
      // 接下来执行用户角色逻辑，todo
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        // 2、获取用户角色
        const roles = await store.dispatch("user/getInfo");
        const accessRoutes = await store.dispatch(
          "permission/generateRoutes",
          roles
        );

        // 动态添加路由
        router.addRoutes(accessRoutes);

        // 跳转
        next({ ...to });
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
