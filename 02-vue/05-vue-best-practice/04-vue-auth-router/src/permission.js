import router from "./router";
import store from "./store";

const whiteList = ["/login", "/home"];

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const hasToken = localStorage.getItem("token");

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // next();
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        const roles = await store.dispatch("user/getInfo");
        alert(JSON.stringify(roles));
        const accessRoutes = await store.dispatch("permission/generateRoutes", {
          roles
        });

        router.addRoutes(accessRoutes);

        next({ ...to.path });
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
