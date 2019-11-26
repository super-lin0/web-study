import React from "react";

export const Context = React.createContext();
export const Provider = Context.Provider; //提供者
export const Consumer = Context.Consumer; //消费者
export const handleConsumer = Cmp => props => {
  return <Consumer>{ctx => <Cmp {...ctx} {...props} />}</Consumer>;
};

export const MyContext = React.createContext();
export const MyProvider = MyContext.Provider; //提供者
export const MyConsumer = MyContext.Consumer; //消费者
