import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { QUESAPI_PATH, NEWCOL_PATH, COLAPI_PATH } from '../../config';

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
}

class Collection extends Component<StateProps, ComponentState> {
  state: ComponentState = {
    collections: null
  };
  async getCollections() {
    if (this.props.auth && !this.state.collections) {
      try {
        const collections = await axios.get(QUESAPI_PATH + this.props.auth.id);
        this.setState({ collections: collections.data });
      } catch (err) {
        console.log(err);
      }
    }
  }

  renderCollections() {
    return this.state.collections === null
      ? null
      : this.state.collections.map((collection: CollectionType) => {
          return (
            <p key={collection.id} className="panel-block">
              {collection.name}
              <Link to="" className="button is-dark is-medium">
                Practice
              </Link>
              <Link
                to={COLAPI_PATH + collection.id}
                className="button is-dark is-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => this.removeQuestion(collection.id)}
                className="button is-dark is-medium"
              >
                Delete
              </button>
            </p>
          );
        });
  }

  async removeQuestion(qid: number) {
    if (this.props.auth) {
      try {
        await axios.delete(`${QUESAPI_PATH + this.props.auth.id}/${qid}`);
        this.setState(() => {
          return this.state.collections
            ? {
                collections: this.state.collections.filter(
                  collection => collection.id !== qid
                )
              }
            : { collections: null };
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    this.getCollections();
    return (
      <div className="container">
        <nav className="panel">
          <p className="panel-heading">
            <Link to={NEWCOL_PATH}>New Collection</Link>
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
