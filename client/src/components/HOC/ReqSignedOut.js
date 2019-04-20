import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default ComposedComponent => {
  class ReqSignedIn extends Component {
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
  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  ReqSignedIn.propTypes = {
    component: PropTypes.func,
    auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    history: PropTypes.object
  };

  return connect(mapStateToProps)(ReqSignedIn);
};
