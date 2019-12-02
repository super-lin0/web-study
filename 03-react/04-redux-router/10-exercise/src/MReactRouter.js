import React, { Component, useContext } from "react";
import { createBrowserHistory } from "history";

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

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
      <Provider
        value={{ history: this.history, location: this.state.location }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export const Route = ({ path, component: Component }) => {
  const { location } = useContext(Context);
  return location.pathname === path ? <Component></Component> : null;
};

export class Link extends Component {
  onClick = (e, history) => {
    e.preventDefault();
    history.push(this.props.to);
  };
  render() {
    const { to, children } = this.props;
    return (
      <Consumer>
        {ctx => (
          <a href={to} onClick={event => this.onClick(event, ctx.history)}>
            {children}
          </a>
        )}
      </Consumer>
    );
  }
}
