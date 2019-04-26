import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './Landing';
import Signin from './Authentication/Signin';
import Dashboard from './Dashboard/';
import SignUp from './Authentication/Signup';
import NewCollection from './Dashboard/NewCollection';
import { fetchUser } from '../actions/index';
import ReqSignedIn from './HOC/ReqSignedIn';
import ReqSignedOut from './HOC/ReqSignedOut';

class App extends Component {
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
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func
};

export default connect(
  null,
  { fetchUser }
)(App);
