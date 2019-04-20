import './Authentication.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Authentication extends Component {
  render() {
    return (
      <section className="section vcenter">
        <div className="container is-widescreen">
          <h1 className="title">Neuriv</h1>
          <h2 className="subtitle">
            Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
          </h2>
          <div className="columns">
            <div className="column">
              <form action="/auth/email">
                <fieldset className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <Field
                      name="email"
                      type="email"
                      component="input"
                      autoComplete="none"
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
                      autoComplete="none"
                      className="input is-medium"
                    />
                  </div>
                </fieldset>
                <div className="control">
                  <button className="button is-dark is-medium">Sign In</button>
                </div>
              </form>
            </div>

            <div className="column is-half">
              <div>
                <a
                  className="button is-info is-large size1 marginbtm margintop"
                  href="/auth/google"
                >
                  <span className="icon is-medium">
                    <i className="fa fa-google" />
                  </span>
                  <span>Continue with Google</span>
                </a>
                <br />
                <a className="button is-link is-large" href="/auth/facebook">
                  <span className="icon is-medium">
                    <i className="fa fa-facebook" />
                  </span>
                  <span>Continue with Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default compose(
  connect(null),
  reduxForm({ form: 'signin' })
)(Authentication);
