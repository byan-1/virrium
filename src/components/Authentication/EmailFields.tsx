import './EmailFields.scss';
import React, { Component } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../actions';
import {
  EAUTH_PATH,
  SIGNUP_PATH,
  DASHBOARD_PATH,
  TIMEOUT_MSG,
  EMAIL_FORM
} from '../../config';

interface OwnProps {
  page: 'signin' | 'signup';
}

interface ActionProps {
  setUser: (user: Types.UserState) => Types.Action;
}

const pageOptions = {
  signin: {
    btnText: 'Sign In',
    requestLink: EAUTH_PATH
  },
  signup: {
    btnText: 'Sign Up',
    requestLink: SIGNUP_PATH
  }
};

class EmailFields extends Component<
  OwnProps & ActionProps & InjectedFormProps & RouteComponentProps,
  {}
> {
  state = {
    errMessage: '',
    loading: false
  };

  authenticate = async ({ email, password }: Types.EmailProps) => {
    try {
      this.setState({ loading: true });
      const resp = await axios.post(pageOptions[this.props.page].requestLink, {
        email,
        password
      });
      this.props.setUser(resp.data);
      this.props.history.push(DASHBOARD_PATH);
    } catch (err) {
      if (!err.response || err.response.status === 504) {
        this.setState({
          errMessage: TIMEOUT_MSG,
          loading: false
        });
      } else {
        this.setState({ errMessage: err.response.data.error, loading: false });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.authenticate)}>
        <fieldset className="field">
          <label className="label">Email</label>
          <div className="control">
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="off"
              className="input is-medium"
            />
          </div>
        </fieldset>
        <fieldset className="field">
          <label className="label">Password</label>
          <div className="control">
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="off"
              className="input is-medium"
            />
          </div>
        </fieldset>
        <div className="has-text-danger">{this.state.errMessage}</div>
        <div className="control">
          {' '}
          <button
            className={
              this.state.loading
                ? 'button is-dark is-medium formbtn is-loading'
                : 'button is-dark is-medium formbtn'
            }
          >
            {pageOptions[this.props.page].btnText}
          </button>
        </div>
      </form>
    );
  }
}

export default compose(
  reduxForm<{}, OwnProps>({ form: EMAIL_FORM }),
  connect<{}, ActionProps, OwnProps>(
    null,
    { setUser }
  ),
  withRouter
)(EmailFields);
