import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext();

export function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => Comp => props => {
  const store = useContext(Context);
  const getMoreProps = () => {
    const stateProps = mapStateToProps(store.getState());
    // {add: () => ({type: "add"})} => {add: () => dispatch({type: "add"})}
    const dispatchProps = bindActionCreators(
      mapDispatchToProps,
      store.dispatch
    );
    return { ...stateProps, ...dispatchProps, dispatch: store.dispatch };
  };
  useEffect(() => {
    store.subscribe(() => {
      setMoreProps({
        ...moreProps,
        ...getMoreProps()
      });
    });
  }, []);

  const [moreProps, setMoreProps] = useState(getMoreProps());
  return <Comp {...props} {...moreProps} />;
};

// {add: () => ({type: "add"})} => {add: () => dispatch({type: "add"})}
const bindActionCreators = (actionCreators, dispatch) => {
  let obj = {};
  Object.keys(actionCreators).forEach(key => {
    obj[key] = bindActionCreator(actionCreators[key], dispatch);
  });

  return obj;
};

//  () => ({type: "add"}) =>  () => dispatch({type: "add"})
const bindActionCreator = (actionCreator, dispatch) => {
  return (...args) => dispatch(actionCreator(...args));
};
