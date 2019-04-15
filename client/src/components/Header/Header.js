import './Header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
          <a className="navbar-item" href="/auth/logout">
            Sign Out
          </a>
        );
    }
  }
  render() {
    console.log(this.props.auth)
    return (
      <nav className="navbar is-spaced">
        <div className="navbar-menu is-active">
          <div className="navbar-end">{this.renderAuth()}</div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
