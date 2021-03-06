import React, { useContext, useState, useEffect } from "react";

//定义context,用于传递store
const ReduxContext = React.createContext();

export function Provider({ store, children }) {
  return (
    // children 组件复合
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
}

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => Cmp => props => {
  const store = useContext(ReduxContext); //获取store
  const getMoreProps = () => {
    const stateProps = mapStateToProps(store.getState()); //获取state，用于把state映射到props上
    const dispatchProps = bindActionCreators(
      mapDispatchToProps, //这是一个方法组成的对象，如add方法等
      store.dispatch
    );
    return {
      ...stateProps, //存储的是state
      ...dispatchProps //存储的是dispatch方法，比如add等
    };
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
  return <Cmp {...props} {...moreProps} />;
};

//actionCreator是add方法
//，执行add，返回的不就是一个action，比如{type: 'add'}
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
//给actionCreators所有的方法绑定上dispatch
function bindActionCreators(actionCreators, dispatch) {
  let obj = {};
  for (let key in actionCreators) {
    obj[key] = bindActionCreator(actionCreators[key], dispatch);
  }
  return obj;
}
