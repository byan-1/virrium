import './EmailFields.scss';
import React, { Component } from 'react';
import { Field } from 'redux-form';

interface OwnProps {
  errMessage: string;
  loading: boolean;
  buttonText: string;
}

class EmailFields extends Component<OwnProps, {}> {
  render() {
    return (
      <div>
        <fieldset className="field">
          <label className="label">Email</label>
          <div className="control">
            <Field
              name="email"
              type="text"
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
        <div className="has-text-danger">{this.props.errMessage}</div>
        <div className="control">
          {' '}
          <button
            className={
              this.props.loading
                ? 'button is-dark is-medium formbtn is-loading'
                : 'button is-dark is-medium formbtn'
            }
          >
            {this.props.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default EmailFields;
