import React, { PureComponent, ReactElement, ReactNode } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "../Header";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import QuestionForm from "./Forms/QuestionForm";
import { QUESAPI_PATH, DASHBOARD_PATH } from "../../config";
import CollectionForm from "./Forms/CollectionForm";
import withCollection from "./withCollection";

interface StateProps {
  auth: Types.UserState;
  search: string;
}

interface ComponentState {
  nameError: boolean;
  errMsg: string;
}

class NewCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps
> {
  public state: ComponentState = {
    nameError: false,
    errMsg: "",
  };

  private createCollection = async ({
    title,
  }: Types.NewCollection): Promise<void> => {
    if (this.props.auth) {
      if (!title || title.length === 0) {
        this.setState({ nameError: true });
        return;
      }
      this.setState({ nameError: false });
      try {
        await axios.post(QUESAPI_PATH + this.props.auth.id, {
          title,
          questions: Object.values(this.props.questions),
        });
        this.props.history.push(DASHBOARD_PATH);
      } catch (err) {
        this.setState({ errMsg: err.response.data });
      }
    }
  };

  private renderErr(): null | ReactNode {
    if (this.state.nameError) {
      return (
        <p className="has-text-danger">Collection must have a valid name.</p>
      );
    }
    if (this.state.errMsg.length) {
      return <p className="has-text-danger">{this.state.errMsg}</p>;
    }
    return null;
  }

  public render(): ReactElement {
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="title move-top">Create a new collection</h1>
          <CollectionForm
            btnText="Create"
            submitAction={this.createCollection}
            renderJSX={this.props.renderQuestions(this.props.currentPage)}
            renderErr={this.renderErr()}
          />
          {this.props.renderPaginate}
          <QuestionForm submitAction={this.props.addQuestion} />
        </div>
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

export default compose(
  withRouter,
  withCollection,
  connect(mapStateToProps)
)(NewCollection);
