import "./Sidebar.scss";
import React, { PureComponent, ReactNode } from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { signOut } from "../../actions";
import { connect } from "react-redux";

interface DispatchProps {
  signOut: Function;
}

class Sidebar extends PureComponent<DispatchProps & RouteComponentProps> {
  public render(): ReactNode {
    return (
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <a onClick={(): object => this.props.signOut(this.props.history)}>
              Log Out
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { signOut })
)(Sidebar);
