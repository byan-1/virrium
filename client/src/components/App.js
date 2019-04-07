import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './Landing/Landing';
import Authentication from './Authentication/Authentication';
import { fetchUser } from '../actions/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={Authentication} />
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
