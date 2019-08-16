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
