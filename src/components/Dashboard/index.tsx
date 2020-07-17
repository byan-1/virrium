import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Collection from './Collection';

class Dashboard extends Component {
  public render(): ReactNode {
    return (
      <div>
        <Header />
        <Collection />
      </div>
    );
  }
}

export default connect(null)(Dashboard);
