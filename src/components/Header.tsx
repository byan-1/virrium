import "./Header.scss";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { signOut } from "../actions";
import { HOME_PATH, SIGNIN_PATH, NEWCOL_PATH } from "../config";
import { setSearchText } from "../actions";
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
            Sign Out
          </a>
        );
    }
  };

  private renderHome = (): ReactNode => {
    return (
      <Link className="navbar-item" to={HOME_PATH}>
        Return to Home
      </Link>
    );
  };

  private renderCreate = (): ReactNode | void => {
    const pathname = this.props.location.pathname;
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/practice") ||
      pathname.startsWith("/new")
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
    if (this.props.location.pathname == "/dashboard") {
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

  public pageOptions = {
    auth: { hNav: this.renderHome },
    regular: { hNav: this.renderAuth },
  };

  public render(): ReactNode {
    return (
      <nav className="navbar is-spaced is-link">
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
