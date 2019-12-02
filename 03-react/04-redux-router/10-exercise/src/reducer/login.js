const initState = {
  isLogin: false
};
export default function login(state = initState, action) {
  switch (action.type) {
    case "login":
      return { isLogin: true };
    default:
      return state;
  }
}
