import compose from "./compose";

const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let listeners = [];

  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.map(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  const getState = () => currentState;

  dispatch({ type: "ActionTypes.INIT" });

  return { dispatch, getState, subscribe };
};

const applyMiddleware = (...middlewares) => {
  return createStore => (...args) => {
    const store = createStore(...args);

    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch
    };

    let chians = middlewares.map(mid => mid(midApi));

    dispatch = compose(...chians)(dispatch);

    return { ...store, dispatch };
  };
};

export { createStore, applyMiddleware };
