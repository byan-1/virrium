import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import Signin from "./Authentication/Signin";
import Dashboard from "./Dashboard";
import SignUp from "./Authentication/Signup";
import NewCollection from "./Dashboard/NewCollection";
import EditCollection from "./Dashboard/EditCollection";
import { fetchUser } from "../actions/index";
import ReqSignedIn from "./HOC/ReqSignedIn";
import ReqSignedOut from "./HOC/ReqSignedOut";
import PracticeCollection from "./Dashboard/PracticeCollection";
import ScorePage from "./Dashboard/ScorePage";

interface DispatchProps {
  fetchUser: Function;
}

class App extends Component<DispatchProps, {}> {
  public componentDidMount(): void {
    this.props.fetchUser();
  }

  public render(): any {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ReqSignedOut(Landing)} />
        <Route exact path="/signin" component={ReqSignedOut(Signin)} />
        <Route exact path="/dashboard" component={ReqSignedIn(Dashboard)} />
        <Route exact path="/signup" component={ReqSignedOut(SignUp)} />
        <Route exact path="/new" component={ReqSignedIn(NewCollection)} />
        <Route
          exact
          path={"/collection/:qset_id"}
          component={ReqSignedIn(EditCollection)}
        />
        <Route
          exact
          path={"/practice/:cid"}
          component={ReqSignedIn(PracticeCollection)}
        />
        <Route
          exact
          path="/score/:qset_id"
          component={ReqSignedIn(ScorePage)}
        />
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
