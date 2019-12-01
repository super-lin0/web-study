import React, { Component, useContext } from "react";
import { createBrowserHistory } from "history";

const Context = React.createContext();

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory(this.props);
    this.state = {
      location: this.history.location
    };
    this.unlisten = this.history.listen(location => {
      this.setState({
        location
      });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <Context.Provider
        value={{ history: this.history, location: this.state.location }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Route = props => {
  const { path, component: Comp } = props;
  const { location } = useContext(Context);
  const match = path === location.pathname;

  return match ? <Comp></Comp> : null;
};

export class Link extends Component {
  handleClick = (event, history) => {
    event.preventDefault();
    history.push(this.props.to);
  };
  render() {
    const { children, to } = this.props;
    return (
      <Context.Consumer>
        {ctx => (
          <a href={to} onClick={event => this.handleClick(event, ctx.history)}>
            {children}
          </a>
        )}
      </Context.Consumer>
    );
  }
}
