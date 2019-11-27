export default function(state = [], action) {
  switch (action.type) {
    case "init":
    case "replace":
      return [...action.payload];
    case "add":
      return [...state, action.payload];

    default:
      return state;
  }
}
