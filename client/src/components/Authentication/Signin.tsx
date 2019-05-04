import './Signin.scss';
import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import EmailFields from './EmailFields';
import OAuthButtons from './OAuthButtons';
import Header from '../Header';
import { setUser } from '../../actions';

interface DispatchProps extends RouteComponentProps {
  setUser: (user: object) => Types.Action;
}

class Signin extends Component<InjectedFormProps & DispatchProps> {
  state = {
    errMessage: '',
    loading: false
  };

  signIn = async ({ email, password }: Types.EmailProps) => {
    try {
      this.setState({ loading: true });
      const resp = await axios.post('/auth/email', { email, password });
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
            <h1 className="title">Neuriv</h1>
            <h2 className="subtitle">
              Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
            </h2>
            <div className="columns">
              <div className="column">
                <form onSubmit={this.props.handleSubmit(this.signIn)}>
                  <EmailFields
                    buttonText="Sign In"
                    errMessage={this.state.errMessage}
                    loading={this.state.loading}
                  />
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
  connect(
    null,
    { setUser }
  ),
  reduxForm({ form: 'signin' })
)(Signin);
