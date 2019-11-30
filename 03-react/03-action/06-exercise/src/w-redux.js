export function createStore(reducer, enhancer) {
  let state = undefined;
  let listeners = [];

  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  const dispatch = action => {
    state = reducer(state, action);
    listeners.map(listener => listener());
  };

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    // 返回一个取消订阅的函数
    return function unSubscript() {
      listeners = listeners.filter(item => item !== listener);
    };
  };

  dispatch({ type: "INIT" });

  return { dispatch, getState, subscribe };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch
    };

    const chains = middlewares.map(mid => mid(midApi));

    dispatch = compose(...chains)(dispatch);

    return { ...store, dispatch };
  };
}
