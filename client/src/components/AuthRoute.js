import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthRoute({ component: Component, ...rest }) {
  const redirectTo = props => {
    const reqAuthed =
      props.auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      );
    const reqUnauthed =
      props.auth === false ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/dashboard' }} />
      );
    console.log(props.auth);
    return props.requireAuth ? reqAuthed : reqUnauthed;
  };

  return <Route {...rest} render={redirectTo} />;
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

AuthRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  requireAuth: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
