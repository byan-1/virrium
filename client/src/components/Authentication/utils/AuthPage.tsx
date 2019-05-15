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

export default (
  ComposedComponent: React.ComponentType
): React.ComponentType => {
  class Authenticate extends Component<InjectedFormProps & DispatchProps>  {
    componentDidMount() {
      if (this.props.auth === false) {
        this.props.history.replace('/signin');
      }
    }

    componentDidUpdate() {
      if (this.props.auth === false) {
        this.props.history.replace('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  
  function mapStateToProps(state: Types.State): Types.AuthState {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ReqSignedIn);
};
