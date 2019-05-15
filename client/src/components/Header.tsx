import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { signOut } from '../actions';
import { HOME_PATH, SIGNIN_PATH } from '../config';

interface StateProps {
  auth: Types.UserState;
}

interface DispatchProps {
  signOut: Function;
}

interface OwnProps extends RouteComponentProps {
  page: 'auth' | 'regular';
}

class Header extends Component<StateProps & DispatchProps & OwnProps, {}> {
  static defaultProps: { page: 'regular' };

  renderAuth = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Link className="navbar-item" to={SIGNIN_PATH}>
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
  };

  renderHome = () => {
    return (
      <Link className="navbar-item" to={HOME_PATH}>
        Return to Home
      </Link>
    );
  };

  pageOptions = {
    auth: { hNav: this.renderHome },
    regular: { hNav: this.renderAuth }
  };

  render() {
    return (
      <nav className="navbar is-spaced">
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            {this.pageOptions[this.props.page].hNav()}
          </div>
        </div>
      </nav>
    );
  }
}

Header.defaultProps = {
  page: 'regular'
};

function mapStateToProps(state: Types.State): Types.AuthState {
  return { auth: state.auth };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(Header)
);
