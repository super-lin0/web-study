import React, { Component } from "react";

export const Context = React.createContext();

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;

export const handleConsumer = Cmp => props => {
  return <Consumer>{ctx => <Cmp {...props} {...ctx} />}</Consumer>;
};
