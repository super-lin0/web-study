function createStore(reducer, applyMiddleware) {
  if (applyMiddleware) {
    return applyMiddleware(createStore)(reducer);
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

  dispatch({ type: "INIT" });

  return { subscribe, dispatch, getState };
}

function compose(...funcs) {
  const len = funcs.length;
  if (len === 0) {
    return arg => arg;
  }
  if (len === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch
    };

    let chains = middlewares.map(mid => mid(midApi));
    dispatch = compose(...chains)(dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

export { createStore, applyMiddleware };
