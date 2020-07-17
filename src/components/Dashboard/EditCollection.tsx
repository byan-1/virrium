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
}

class EditCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps<Params>
> {
  public state: ComponentState = {
    title: null,
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

  private createCollection = async ({
    title,
  }: Types.NewCollection): Promise<void> => {
    await axios.patch(`/api/question/qset/${this.props.match.params.qset_id}`, {
      title,
      questions: this.props.questions,
    });
    this.props.history.push(`/dashboard`);
  };

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Edit collection</h1>
          {this.state.title === null ? null : (
            <CollectionForm
              btnText="Edit"
              submitAction={this.createCollection}
              renderJSX={this.props.renderQuestions()}
              initVal={this.state.title}
            />
          )}
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
