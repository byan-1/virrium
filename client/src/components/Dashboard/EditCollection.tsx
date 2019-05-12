import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Header from '../Header';

interface Params {
  id: string;
}

class EditCollection extends Component<RouteComponentProps<Params>> {
  render() {
    return (
      <div>
        <Header authPage={false} />
        <p>Collection: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default connect(null)(EditCollection);
