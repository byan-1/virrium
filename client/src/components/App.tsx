import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './Landing';
import Signin from './Authentication/Signin';
import Dashboard from './Dashboard';
import SignUp from './Authentication/Signup';
import NewCollection from './Dashboard/NewCollection';
import EditCollection from './Dashboard/EditCollection';
import { fetchUser } from '../actions/index';
import ReqSignedIn from './HOC/ReqSignedIn';
import ReqSignedOut from './HOC/ReqSignedOut';

type DispatchProps = {
  fetchUser: Function;
};

class App extends Component<DispatchProps, {}> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ReqSignedOut(Landing)} />
        <Route exact path="/signin" component={ReqSignedOut(Signin)} />
        <Route exact path="/dashboard" component={ReqSignedIn(Dashboard)} />
        <Route exact path="/signup" component={ReqSignedOut(SignUp)} />
        <Route exact path="/new" component={ReqSignedIn(NewCollection)} />
        <Route
          exact
          path="/collection/:id"
          component={ReqSignedIn(EditCollection)}
        />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
