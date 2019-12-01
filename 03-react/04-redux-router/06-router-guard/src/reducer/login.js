const initState = {
  isLogin: false,
  user: {
    name: ""
  }
};

export default function(state = { ...initState }, action) {
  switch (action.type) {
    case "login":
      return { isLogin: true, user: { name: "zhangsan" } };
    default:
      return { ...state };
  }
}
