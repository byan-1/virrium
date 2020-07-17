import './OAuthButtons.scss';
import React, { ReactElement } from 'react';
import { FBAUTH_PATH, GAUTH_PATH } from '../../config';

function OAuthButtons(): ReactElement {
  return (
    <div>
      <a
        className="button is-info is-large size1 marginbtm margintop"
        href={GAUTH_PATH}
      >
        <span className="icon is-medium">
          <i className="fa fa-google" />
        </span>
        <span>Continue with Google</span>
      </a>
      <br />
      <a className="button is-link is-large" href={FBAUTH_PATH}>
        <span className="icon is-medium">
          <i className="fa fa-facebook" />
        </span>
        <span>Continue with Facebook</span>
      </a>
    </div>
  );
}

export default OAuthButtons;
