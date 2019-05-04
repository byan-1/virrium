import './OAuthButtons.scss';
import React from 'react';

function OAuthButtons() {
  return (
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
  );
}

export default OAuthButtons;
