import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setUser } from '../../actions';
import EmailFields from './EmailFields';
import Header from '../Header';

class SignUp extends Component {
  signUp = async ({ email, password }) => {
    try {
      const user = await axios.post('/auth/signup', { email, password });
      this.props.setUser(user);
      this.props.history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Header authPage={true} />
        <section className="section vcenter">
          <div className="container is-widescreen">
            <form onSubmit={handleSubmit(this.signUp)}>
              <EmailFields buttonText="Sign Up" />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object,
  setUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default compose(
  connect(
    null,
    { setUser }
  ),
  reduxForm({ form: 'signup' })
)(SignUp);
