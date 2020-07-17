/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "./Collection.scss";
import React, { PureComponent, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { connect } from "react-redux";
import { QSetResp, QSet } from "../../common-utils/lib/QSetHelpers";

interface StateProps {
  auth: Types.UserState;
  search: string;
}

interface ComponentState {
  collections: QSetResp;
}

class Collection extends PureComponent<StateProps, ComponentState> {
  public state: ComponentState = {
    collections: [],
  };

  public async componentDidMount(): Promise<void> {
    if (this.props.auth != null && this.props.auth != false) {
      this.setCollections(this.props.auth.id!);
    }
  }

  private authLoaded(prevProps: StateProps): boolean {
    return prevProps.auth != this.props.auth;
  }

  public async componentDidUpdate(prevProps: StateProps): Promise<void> {
    //makes API call to get collections when authentication state is updated
    if (this.props.auth && this.authLoaded(prevProps)) {
      this.setCollections(this.props.auth.id!);
    }
  }

  private async setCollections(uid: number): Promise<void> {
    const collectionResp: AxiosResponse<QSetResp> = await axios.get(
      `/api/question/${uid}`
    );
    this.setState({ collections: collectionResp.data });
  }

  private searchFilter(): QSetResp {
    if (this.props.search) {
      return this.state.collections.filter((s): boolean =>
        s.name.includes(this.props.search)
      );
    }
    return this.state.collections;
  }

  private renderCollections(): ReactElement[] {
    return this.searchFilter().map(
      (collection: QSet): ReactElement => (
        <div key={collection.id} className="box question-area">
          <div className="set-title"> {collection.name}</div>
          <p className="action-buttons">
            <Link
              to={`/practice/${collection.id}`}
              className="button is-medium is-link is-outlined"
            >
              <span className="icon is-small">
                <i className="fa fa-keyboard" />
              </span>
            </Link>
            <Link
              to={`/collection/${collection.id}`}
              className="button is-medium is-link is-outlined"
            >
              <span className="icon is-small">
                <i className="fa fa-cog" />
              </span>
            </Link>
            <Link
              to={`/stats/${collection.id}`}
              className="button is-medium is-link is-outlined"
            >
              <span className="icon is-small">
                <i className="fa fa-signal" />
              </span>
            </Link>
            <button
              onClick={(): Promise<void> =>
                this.removeCollection(collection.id)
              }
              className="button is-medium is-danger is-outlined"
            >
              <span className="icon is-small">
                <i className="fa fa-trash" />
              </span>
            </button>
          </p>
        </div>
      )
    );
  }

  private async removeCollection(cid: number): Promise<void> {
    try {
      await axios.delete(`api/question/qset/${cid}`);
      this.setState(
        (): ComponentState => {
          return {
            collections: this.state.collections.filter(
              (collection): boolean => collection.id !== cid
            ),
          };
        }
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  public render(): ReactNode {
    return (
      <div className="container">
        <nav className="panel">{this.renderCollections()}</nav>
      </div>
    );
  }
}

function mapStateToProps({
  auth,
  search,
}: Types.State): Types.AuthState & Types.SearchState {
  return { auth, search };
}

export default connect(mapStateToProps)(Collection);
