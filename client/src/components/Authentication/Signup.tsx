import React, { Component } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../actions';
import EmailFields from './EmailFields';
import Header from '../Header';
import { RouteComponentProps } from 'react-router-dom';

interface DispatchProps extends RouteComponentProps {
  setUser: (user: object) => Types.Action;
}

class SignUp extends Component<InjectedFormProps & DispatchProps> {
  state = {
    errMessage: '',
    loading: false
  };

  signUp = async ({ email, password }: Types.EmailProps) => {
    try {
      this.setState({ loading: true });
      const resp = await axios.post('/auth/signup', { email, password });
      this.props.setUser(resp.data);
      this.props.history.push('/dashboard');
    } catch (err) {
      if (!err.response || err.response.status === 504) {
        this.setState({
          errMessage: 'Server timed out. Please try again later.',
          loading: false
        });
      } else {
        this.setState({ errMessage: err.response.data.error, loading: false });
      }
    }
  };

  render() {
    return (
      <div>
        <Header authPage={true} />
        <section className="section vcenter">
          <div className="container is-widescreen">
            <form onSubmit={this.props.handleSubmit(this.signUp)}>
              <EmailFields
                buttonText="Sign Up"
                errMessage={this.state.errMessage}
                loading={this.state.loading}
              />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { setUser }
  ),
  reduxForm({ form: 'signup' })
)(SignUp);
