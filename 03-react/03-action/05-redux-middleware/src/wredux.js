export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  const listeners = [];
  let currentReducer = undefined;

  const dispatch = action => {
    currentReducer = reducer(currentReducer, action);
    listeners.map(listener => listener());
  };

  const getState = () => currentReducer;

  const subscribe = listener => listeners.push(listener);

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

    let midApi = {
      getState: store.getState,
      dispatch
    };

    let chians = middlewares.map(mid => mid(midApi));

    dispatch = compose(...chians)(dispatch);

    return { ...store, dispatch };
  };
}
