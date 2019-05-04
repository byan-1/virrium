import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

interface StateProps {
  auth: Types.UserState;
}

interface ComponentState {
  collections: Array<CollectionType> | null;
}

interface CollectionType {
  id: number;
  uid: number;
  name: string;
  tags: Array<any>;
}

class Collection extends Component<StateProps, ComponentState> {
  state: ComponentState = {
    collections: null
  };
  async getCollections() {
    if (this.props.auth && !this.state.collections) {
      try {
        const collections = await axios.get(
          '/api/question/' + this.props.auth.id
        );
        this.setState({ collections: collections.data });
      } catch (err) {
        console.log('ERR OCCURED');
      }
    }
  }

  renderCollections() {
    return this.state.collections === null
      ? null
      : this.state.collections.map((collection: CollectionType) => {
          return (
            <Link
              to={'/collection/' + collection.id}
              key={collection.id}
              className="panel-block"
            >
              {collection.name}
            </Link>
          );
        });
  }

  render() {
    this.getCollections();
    return (
      <div className="container">
        <nav className="panel">
          <p className="panel-heading">
            {' '}
            <Link to="/new">New Collection</Link>
          </p>

          {this.renderCollections()}
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default connect(mapStateToProps)(Collection);
