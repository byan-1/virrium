import './Authentication.scss';
import React, { Component } from 'react';

class Authentication extends Component {
  render() {
    return (
      <section className="section">
        <div className="box has-text-centered">
          <a className="button is-info is-medium size1" href="/auth/google">
            <span className="icon is-medium">
              <i className="fa fa-google" />
            </span>
            <span>Continue with Google</span>
          </a>
          <br />
          <a className="button is-link is-medium" href="/auth/facebook">
            <span className="icon is-medium">
              <i className="fa fa-facebook" />
            </span>
            <span>Continue with Facebook</span>
          </a>
        </div>
      </section>
    );
  }
}

export default Authentication;
