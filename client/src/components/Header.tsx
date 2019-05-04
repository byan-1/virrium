import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { signOut } from '../actions';

interface StateProps {
  auth: Types.UserState;
}

interface DispatchProps {
  signOut: Function;
}

interface OwnProps extends RouteComponentProps {
  authPage: boolean;
}

class Header extends Component<StateProps & DispatchProps & OwnProps, {}> {
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Link className="navbar-item" to="/signin">
            Sign In
          </Link>
        );
      default:
        return (
          <a
            className="navbar-item"
            onClick={() => this.props.signOut(this.props.history)}
          >
            Sign Out
          </a>
        );
    }
  }

  renderHome() {
    return (
      <Link className="navbar-item" to="/">
        Return to Home
      </Link>
    );
  }

  render() {
    return (
      <nav className="navbar is-spaced">
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            {this.props.authPage ? this.renderHome() : this.renderAuth()}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state: Types.State): Types.AuthState {
  return { auth: state.auth };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(Header)
);
