import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
