import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import Header from '../Header';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

type StateProps = {
  auth: Types.UserState;
};

class NewCollection extends Component<
  StateProps & RouteComponentProps & InjectedFormProps,
  {}
> {
  createCollection = async ({ title }: Types.NewCollection) => {
    if (this.props.auth) {
      await axios.post('/api/question/' + this.props.auth.id, { title });
      this.props.history.push('/dashboard');
    }
  };
  render() {
    return (
      <div>
        <Header authPage={false} />
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

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'createcollection' })
)(NewCollection);
