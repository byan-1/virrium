import "./EditCollection.scss";
import React, { PureComponent, ReactNode } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "../Header";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import QuestionForm from "./Forms/QuestionForm";
import CollectionForm from "./Forms/CollectionForm";
import withCollection from "./withCollection";
import { SingleQuestion } from "../../common-utils/lib/QSetHelpers";

interface Params {
  qset_id: string;
}

interface StateProps {
  auth: Types.UserState;
}

interface ComponentState {
  title: string | null;
  nameError: boolean;
  errMsg: string;
}

class EditCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps<Params>
> {
  public state: ComponentState = {
    title: null,
    nameError: false,
    errMsg: "",
  };

  public async componentDidMount(): Promise<void> {
    const resp = await axios.get(
      `/api/question/qset/${this.props.match.params.qset_id}`
    );
    this.setState({ title: resp.data.qsetTitle });
    const questions: Types.QuestionsReq = {};
    resp.data.questions.map((qIn: SingleQuestion): void => {
      questions[qIn.id] = { question: qIn.question, answer: qIn.answer };
    });
    this.props.setQuestions(questions);
  }

  private editCollection = async ({
    title,
  }: Types.NewCollection): Promise<void> => {
    if (this.props.auth) {
      if (!title || title.length === 0) {
        this.setState({ nameError: true });
        return;
      }
      this.setState({ nameError: false });
      try {
        await axios.patch(
          `/api/question/qset/${this.props.match.params.qset_id}`,
          {
            title,
            questions: this.props.questions,
          }
        );
        this.props.history.push(`/dashboard`);
      } catch (err) {
        this.setState({ errMsg: err.response.data });
      }
    }
  };

  private renderErr(): ReactNode | null {
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

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="title">Edit collection</h1>
          {this.state.title === null ? null : (
            <CollectionForm
              btnText="Submit"
              submitAction={this.editCollection}
              renderJSX={this.props.renderQuestions(this.props.currentPage)}
              initVal={this.state.title}
              renderErr={this.renderErr()}
            />
          )}
          {this.props.renderPaginate}
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
  connect(mapStateToProps),
  withRouter,
  withCollection
)(EditCollection);
