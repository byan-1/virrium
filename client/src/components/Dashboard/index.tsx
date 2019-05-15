import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Collection from './Collection';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header page="regular" />
        <Collection />
      </div>
    );
  }
}

export default connect(null)(Dashboard);
