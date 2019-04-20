import './Signin.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import EmailFields from './EmailFields';
import OAuthButtons from './OAuthButtons';
import Header from '../Header';

class Signin extends Component {
  render() {
    return (
      <div>
        <Header authPage={true} />
        <section className="section vcenter">
          <div className="container is-widescreen">
            <h1 className="title">Neuriv</h1>
            <h2 className="subtitle">
              Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
            </h2>
            <div className="columns">
              <div className="column">
                <form action="/auth/email">
                  <EmailFields buttonText="Sign In" />
                </form>
              </div>
              <div className="column is-half">
                <OAuthButtons />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default compose(
  connect(null),
  reduxForm({ form: 'signin' })
)(Signin);
