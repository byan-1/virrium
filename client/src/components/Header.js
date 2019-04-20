import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../actions';

class Header extends Component {
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

Header.propTypes = {
  signOut: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  authPage: PropTypes.bool,
  history: PropTypes.object
};

Header.defaultProps = {
  authPage: false
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(Header)
);
