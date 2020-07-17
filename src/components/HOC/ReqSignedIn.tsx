import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { InjectedFormProps } from "redux-form";

interface StateProps extends RouteComponentProps {
  auth: Types.UserState;
}

export default (ComposedComponent: any): any => {
  class ReqSignedIn extends Component<StateProps & InjectedFormProps> {
    public componentDidMount(): void {
      if (this.props.auth === false) {
        this.props.history.replace("/signin");
      }
    }

    public componentDidUpdate(): void {
      if (this.props.auth === false) {
        this.props.history.replace("/signin");
      }
    }

    public render(): ReactNode {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state: Types.State): Types.AuthState {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ReqSignedIn);
};
