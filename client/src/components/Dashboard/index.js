import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Header from '../Header';
import Collection from './Collection';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Collection />
      </div>
    );
  }
}

export default Dashboard;
