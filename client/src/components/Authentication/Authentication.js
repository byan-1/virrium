import './Authentication.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Authentication extends Component {
  render() {
    return (
      <section className="section vcenter">
        <div className="container is-widescreen">
          <h1 className="title">Neutriv</h1>
          <h2 className="subtitle">
            Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
          </h2>
          <div className="columns">
            <div className="column">
              <div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input is-medium" type="email" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input is-medium" type="password" />
                  </div>
                </div>
                <div className="control">
                  <button className="button is-dark is-medium">Sign In</button>
                </div>
              </div>
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

export default Authentication;
