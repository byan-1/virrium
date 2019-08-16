import React from 'react';
import EmailFields from './EmailFields';
import Header from '../Header';
import { SIGNUP_PAGE, AUTH_HEADER } from '../../config';

function SignUp() {
  return (
    <div>
      <Header page={AUTH_HEADER} />
      <section className="section vcenter">
        <div className="container is-widescreen">
          <EmailFields page={SIGNUP_PAGE} />
        </div>
      </section>
    </div>
  );
}

export default SignUp;
