import React, { Component, useContext } from "react";
import { createBrowserHistory } from "history";

const Context = React.createContext();

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      location: this.history.location
    };

    this.unlisten = this.history.listen(location =>
      this.setState({ location })
    );
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          history: this.history,
          location: this.history.location
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Route = ({ path, component: Component }) => {
  const { location } = useContext(Context);
  return location.pathname === path ? <Component /> : null;
};

export class Link extends Component {
  onClick = (e, history) => {
    e.preventDefault();
    history.push(this.props.to);
  };
  render() {
    const { to, children } = this.props;
    return (
      <Context.Consumer>
        {ctx => (
          <a href={to} onClick={e => this.onClick(e, ctx.history)}>
            {children}
          </a>
        )}
      </Context.Consumer>
    );
  }
}
