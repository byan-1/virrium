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
import {
  HOME_PATH,
  SIGNIN_PATH,
  DASHBOARD_PATH,
  SIGNUP_PATH,
  NEWCOL_PATH,
  EDITCOL_PATH
} from '../config';

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
        <Route exact path={HOME_PATH} component={ReqSignedOut(Landing)} />
        <Route exact path={SIGNIN_PATH} component={ReqSignedOut(Signin)} />
        <Route exact path={DASHBOARD_PATH} component={ReqSignedIn(Dashboard)} />
        <Route exact path={SIGNUP_PATH} component={ReqSignedOut(SignUp)} />
        <Route
          exact
          path={NEWCOL_PATH}
          component={ReqSignedIn(NewCollection)}
        />
        <Route
          exact
          path={EDITCOL_PATH + ':qid'}
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
