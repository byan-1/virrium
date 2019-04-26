import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Collection extends Component {
  state = {
    collections: null
  };
  async getCollections() {
    if (this.props.auth && !this.state.collections) {
      const collections = await axios.get(
        '/api/question/' + this.props.auth.id
      );
      this.setState({ collections: collections.data });
    }
  }

  renderCollections() {
    return this.state.collections !== null
      ? this.state.collections.map(collection => {
          return (
            <Link
              to={'/collection/' + collection.id}
              key={collection.id}
              className="panel-block"
            >
              {collection.name}
            </Link>
          );
        })
      : null;
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

Collection.propTypes = {
  auth: PropTypes.object
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Collection);
