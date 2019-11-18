export default function({ route, redirect, store }) {
  console.log("middleware: token: ", store.state.user.token);

  if (!store.state.user.token) {
    redirect("/login?redirect=" + route.path);
  }
}
