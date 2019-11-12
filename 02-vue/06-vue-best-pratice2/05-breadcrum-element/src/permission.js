import router from "./router";
import store from "./store";

const whiteList = ["/login", "/home"];

router.beforeEach(async (to, from, next) => {
  const hasToken = localStorage.getItem("token");

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        const roles = await store.dispatch("user/getInfo");
        const accessRoutes = await store.dispatch("permission/generate", {
          roles
        });

        router.addRoutes(accessRoutes);

        next({ ...to });
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
