/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "./Collection.scss";
import React, { PureComponent, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { connect } from "react-redux";
import { QSetResp, QSet } from "../../common-utils/lib/QSetHelpers";
import ReactPaginate from "react-paginate";
import Popup from "reactjs-popup";
import { emptySearchText } from "../../actions";

interface StateProps {
  auth: Types.UserState;
  search: string;
}

interface ComponentState {
  collections: QSetResp;
  collectionsLoaded: boolean;
  numPages: number;
  currentPage: number;
  shownCollections: QSetResp;
}

interface ActionProps {
  emptySearchText: () => Types.Action;
}

class Collection extends PureComponent<
  StateProps & ActionProps,
  ComponentState
> {
  private static pageSize = 8;
  public state: ComponentState = {
    collections: [],
    collectionsLoaded: false,
    numPages: 0,
    currentPage: 1,
    shownCollections: [],
  };

  public async componentDidMount(): Promise<void> {
    if (this.props.auth != null && this.props.auth != false) {
      this.setCollections(this.props.auth.id!);
    }
    this.props.emptySearchText();
  }

  private setActiveCollections(collection: QSetResp): QSetResp {
    const startIndex = (this.state.currentPage - 1) * Collection.pageSize;
    const endIndex = startIndex + Collection.pageSize;
    return collection.slice(startIndex, endIndex);
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
    this.setState({
      collections: collectionResp.data,
      collectionsLoaded: true,
      numPages: Math.ceil(collectionResp.data.length / Collection.pageSize),
    });
  }

  private searchFilter(): QSetResp {
    if (this.props.search) {
      const filtered = this.state.collections.filter((s): boolean =>
        s.name.includes(this.props.search)
      );
      if (
        Math.ceil(filtered.length / Collection.pageSize) * Collection.pageSize <
        this.state.currentPage * Collection.pageSize
      ) {
        this.setState({
          currentPage: Math.ceil(filtered.length / Collection.pageSize),
        });
      }
      this.setState({
        numPages: Math.ceil(filtered.length / Collection.pageSize),
      });
      return filtered;
    }
    this.setState({
      numPages: Math.ceil(this.state.collections.length / Collection.pageSize),
    });
    return this.state.collections;
  }

  private renderCollections(): ReactNode {
    if (!this.state.collectionsLoaded) {
      return <div className="spinner"></div>;
    }
    if (this.state.collections.length === 0 && this.state.collectionsLoaded) {
      return (
        <div className="box">
          <h3 className="title">You have not created any sets.</h3>
          <h3 className="title"> Sets you create will be displayed here.</h3>
        </div>
      );
    }
    return this.setActiveCollections(this.searchFilter()).map(
      (collection: QSet): ReactElement => (
        <div key={collection.id} className="box question-area">
          <div className="set-title"> {collection.name}</div>
          <p className="action-buttons">
            <Link
              to={`/practice/${collection.id}`}
              className="button is-medium is-link is-outlined"
              title="Practice"
            >
              <span className="icon is-small">
                <i className="fa fa-keyboard" />
              </span>
            </Link>
            <Link
              to={`/collection/${collection.id}`}
              className="button is-medium is-link is-outlined"
              title="Edit"
            >
              <span className="icon is-small">
                <i className="fa fa-cog" />
              </span>
            </Link>
            <Link
              to={`/stats/${collection.id}`}
              className="button is-medium is-link is-outlined"
              title="Details"
            >
              <span className="icon is-small">
                <i className="fa fa-signal" />
              </span>
            </Link>
            <Popup
              trigger={
                <button
                  title="Delete"
                  className="button is-medium is-danger is-outlined"
                >
                  <span className="icon is-small">
                    <i className="fa fa-trash" />
                  </span>
                </button>
              }
              modal
              closeOnDocumentClick
              closeOnEscape
            >
              {(close): ReactElement => (
                <div className="modal-popup">
                  <h5 className="title">Delete this set?</h5>
                  <h5 className="is-bold is-size-2">{collection.name}</h5>
                  <h5>You are about to delete this set and all of its data.</h5>
                  <h5 className="is-bold">
                    Are you sure? This action cannot be undone.
                  </h5>
                  <div>
                    <button
                      onClick={(): Promise<void> =>
                        this.removeCollection(collection.id)
                      }
                      title="Delete"
                      className="button formButton is-large is-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(): void => {
                        close();
                      }}
                      title="Cancel"
                      className="button formButton is-large is-dark"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </p>
        </div>
      )
    );
  }

  private async removeCollection(cid: number): Promise<void> {
    try {
      await axios.delete(`api/question/qset/${cid}`);
      const newCollections = this.state.collections.filter(
        (collection): boolean => collection.id !== cid
      );
      this.setState({
        collections: newCollections,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  private renderPaginate = (): ReactNode => {
    if (this.state.numPages > 1) {
      return (
        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={"..."}
          breakClassName={"break-me"}
          disabledClassName={"hidden-element"}
          pageCount={this.state.numPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      );
    }
  };

  private handlePageClick = (data: any): void => {
    let selected = data.selected + 1;
    this.setState({ currentPage: selected });
  };

  public render(): ReactNode {
    return (
      <div className="container collections">
        <nav className="panel">{this.renderCollections()}</nav>
        {this.renderPaginate()}
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

export default connect(mapStateToProps, { emptySearchText })(Collection);
