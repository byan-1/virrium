import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { InjectedFormProps } from 'redux-form';

interface StateProps extends RouteComponentProps {
  auth: Types.UserState;
}

export default (
  ComposedComponent: React.ComponentType
): React.ComponentType => {
  class ReqSignedIn extends Component<StateProps & InjectedFormProps> {
    componentDidMount() {
      if (this.props.auth) {
        this.props.history.replace('/dashboard');
      }
    }

    componentDidUpdate() {
      if (this.props.auth) {
        this.props.history.replace('/dashboard');
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
