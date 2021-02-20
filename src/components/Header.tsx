import "./Header.scss";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { HOME_PATH, SIGNIN_PATH, NEWCOL_PATH, SIGNUP_PATH } from "../config";
import { setSearchText, signOut } from "../actions";
import { AuthState, SearchState } from "../@types";

interface StateProps {
  auth: Types.UserState;
  search: string;
}

interface ActionProps {
  setSearchText: (curText: string) => Types.Action;
}

interface DispatchProps {
  signOut: Function;
}

interface OwnProps extends RouteComponentProps {
  page: "auth" | "regular";
}

class Header extends Component<
  StateProps & DispatchProps & OwnProps & ActionProps,
  {}
> {
  public static defaultProps: { page: "regular" };

  private renderAuth = (): any => {
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
            onClick={(): object => this.props.signOut(this.props.history)}
          >
            <span className="icon is-small new-icon">
              <i className="fa fa-power-off" />
            </span>
            <span className="signout-text">Sign Out</span>
          </a>
        );
    }
  };

  private renderHome = (): ReactNode => {
    return (
      <Link className="navbar-item" to={HOME_PATH}>
        <span className="icon is-small new-icon">
          <i className="fa fa-home" />
        </span>
        <span>Home</span>
      </Link>
    );
  };

  private renderAccount = (): ReactNode => {
    if (
      this.props.location.pathname.toLowerCase().startsWith(HOME_PATH) &&
      this.props.location.pathname.toLowerCase().startsWith(SIGNIN_PATH) &&
      this.props.location.pathname.toLowerCase().startsWith(SIGNUP_PATH)
    ) {
      return (
        <Link className="navbar-item" to="/account">
          <span className="icon is-small new-icon">
            <i className="fa fa-user" />
          </span>
          <span className="account-text">Account</span>
        </Link>
      );
    }
  };

  private renderCreate = (): ReactNode | void => {
    const pathname = this.props.location.pathname;
    if (
      pathname.toLowerCase().startsWith("/dashboard") ||
      pathname.toLowerCase().startsWith("/practice") ||
      pathname.toLowerCase().startsWith("/new") ||
      pathname.toLowerCase().startsWith("/collection") ||
      pathname.toLowerCase().startsWith("/stats")
    ) {
      return (
        <Link className="navbar-item" to={NEWCOL_PATH}>
          <span className="icon is-small new-icon">
            <i className="fa fa-plus-circle" />
          </span>
          <span className="new-set">New Set</span>
        </Link>
      );
    }
  };

  private renderSearch = (): ReactNode => {
    const loc = this.props.location.pathname.toLowerCase();
    if (
      loc.startsWith("/dashboard") ||
      loc.startsWith("/new") ||
      loc.startsWith("/collection") ||
      loc.startsWith("/stats")
    ) {
      return (
        <div className="navbar-item control is-expanded">
          <i className="fa fa-search search-icon" />
          <input
            className="input search-bar is-rounded"
            type="text"
            placeholder="Search..."
            value={this.props.search}
            onChange={(evt): void => {
              this.props.setSearchText(evt.target.value);
            }}
          ></input>
        </div>
      );
    } else {
      return <div className="navbar-item control is-expanded hidden"></div>;
    }
  };

  private renderNone = (): ReactNode => {
    return <div></div>;
  };

  public pageOptions = {
    auth: { hNav: this.renderNone },
    regular: { hNav: this.renderAuth },
  };

  public render(): ReactNode {
    return (
      <nav className="navbar is-spaced is-light">
        <div className="navbar-start">
          <Link className="navbar-item" to={HOME_PATH}>
            <b>Virrium</b>
          </Link>
        </div>
        <div className="navbar-end">
          <div></div>
          {this.renderCreate()}
        </div>
        {this.renderSearch()}
        <div className="navbar-end">
          <div></div>
          {this.renderAccount()}
        </div>
        <div className="navbar-end">{this.renderHome()}</div>
        <div className="navbar-end">
          {this.pageOptions[this.props.page].hNav()}
        </div>
      </nav>
    );
  }
}

Header.defaultProps = {
  page: "regular",
};

function mapStateToProps(state: Types.State): AuthState & SearchState {
  return { auth: state.auth, search: state.search };
}

export default withRouter(
  connect(mapStateToProps, { signOut, setSearchText })(Header)
);
