import React, { PureComponent, ReactElement } from "react";
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
}

class NewCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps
> {
  private createCollection = async ({ title }: Types.NewCollection): Promise<void> => {
    if (this.props.auth) {

      await axios.post(QUESAPI_PATH + this.props.auth.id, {
        title,
        questions: Object.values(this.props.questions)
      });
      this.props.history.push(DASHBOARD_PATH);
    }
  };

  public render(): ReactElement {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Create a new collection</h1>
          <CollectionForm
            btnText="Create"
            submitAction={this.createCollection}
            renderJSX={this.props.renderQuestions()}
          />
          <QuestionForm submitAction={this.props.addQuestion} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default compose(
  withRouter,
  withCollection,
  connect(mapStateToProps)
)(NewCollection);
