import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Detail from "../detail";

class SearchPage extends Component {
  render() {
    console.log(this.props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div>
        <p>Search id: {id}</p>
        <Link to={`/search/${id}/detail`}>{id}详情</Link>
        <Route path={`/search/:id/detail`} component={Detail}></Route>
      </div>
    );
  }
}

export default SearchPage;
