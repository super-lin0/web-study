const createStore = reducer => {
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

export { createStore };
