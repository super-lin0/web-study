import React, { Component } from "react";
import {
  HashRouter,
  BrowserRouter,
  Link,
  Route,
  Switch
} from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import PrivatePage from "./PrivatePage";
import LoginPage from "./LoginPage";

function Detail(props) {
  return <div>Detail</div>;
}

function Search(props) {
  console.log("pros", props);
  const { id } = props.match.params;
  console.log("log", id);

  return (
    <div>
      <p>Search: {id}</p>
      <Link to={"/search/" + id + "/detail"}>{id}的详情</Link>
      <Route path={"/search/" + id + "/detail"} component={Detail} />
    </div>
  );
}

export default class ReactRouterPage extends Component {
  render() {
    const searchId = 123;
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <HashRouter>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to={"/search/" + searchId}>搜索</Link>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivatePage path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />

            {/* <Route
              path="/user"
              component={UserPage}
              // render={() => <div>render user</div>}
              // children={() => <div>children user</div>}
            /> */}
            <Route path="/search/:id" component={Search} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Route } from "react-router-dom";

// class Foo extends Component {
//   componentDidMount() {
//     console.log("Foo componentDidMount");
//   }
//   componentWillUnmount() {
//     console.log("Foo componentWillUnmount");
//   }
//   render() {
//     const { counter } = this.props;
//     return <div>Foo: {counter}</div>;
//   }
// }

// export default class RouterPage extends Component {
//   constructor(prop) {
//     super(prop);
//     this.state = { counter: 1 };
//   }
//   render() {
//     const { counter } = this.state;
//     return (
//       <div>
//         <button onClick={() => this.setState({ counter: counter + 1 })}>
//           {counter}
//         </button>
//         <BrowserRouter>
//           {/* 渲染component会调用React.createElement, 如果使用下面这种匿名函数的形式，
//         每次都会生成一个新的匿名函数，导致生成的组件的type总不相同，会产生重复的卸载和挂载。
//         所以请正确使用Route中的component和render。
//          */}
//           {/* <Route component={() => <Foo counter={this.state.counter} />} /> */}

//           {/* 以下才是正确使用 */}
//           <Route render={() => <Foo counter={this.state.counter} />} />
//         </BrowserRouter>
//       </div>
//     );
//   }
// }
