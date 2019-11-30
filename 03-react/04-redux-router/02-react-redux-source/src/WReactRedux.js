import React, { useState, useEffect, useContext } from "react";

const Context = React.createContext();

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const connect = (
  mapStateToPros = state => state,
  mapDispatchToPros = {}
) => {
  return Comp => props => {
    const store = useContext(Context);

    const getMoreProps = () => {
      const stateProps = mapStateToPros(store.getState());
      const dispatchProps = bindActionCreators(
        mapDispatchToPros,
        store.dispatch
      );
      return { ...stateProps, ...dispatchProps, dispatch: store.dispatch };
    };
    const [moreProps, setMoreProps] = useState(getMoreProps());
    useEffect(() => {
      store.subscribe(() => setMoreProps({ ...moreProps, ...getMoreProps() }));
    }, []);

    return <Comp {...props} {...moreProps} />;
  };
};

function bindActionCreators(obj, dispatch) {
  const actionCreators = {};
  Object.keys(obj).forEach(key => {
    actionCreators[key] = bindActionCreator(obj[key], dispatch);
  });

  return actionCreators;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
