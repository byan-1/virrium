import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Header from '../Header';
import PropTypes from 'prop-types';
import axios from 'axios';

class NewCollection extends Component {
  createCollection = async ({ title }) => {
    await axios.post('/api/question/' + this.props.auth.id, { title });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Create a new collection</h1>
          <form onSubmit={this.props.handleSubmit(this.createCollection)}>
            <fieldset className="field">
              <label className="label">Title</label>
              <div className="control">
                <Field
                  name="title"
                  type="text"
                  component="input"
                  autoComplete="none"
                  className="input is-medium"
                />
              </div>
            </fieldset>
            <button className="button is-dark is-medium formbtn">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

NewCollection.propTypes = {
  history: PropTypes.object,
  handleSubmit: PropTypes.func,
  auth: PropTypes.object
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'createcollection' })
)(NewCollection);
