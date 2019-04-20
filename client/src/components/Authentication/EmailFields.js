import './EmailFields.scss';
import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

class EmailFields extends Component {
  render() {
    return (
      <div>
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
          <button className="button is-dark is-medium">
            {this.props.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

EmailFields.propTypes = {
  buttonText: PropTypes.string
};

export default EmailFields;
