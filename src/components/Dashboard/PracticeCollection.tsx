import React, { PureComponent, ComponentState, ReactNode } from "react";
import axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Header from "../Header";
import { setCurQuestion } from "../../actions";
import { QAPIResp } from "../../@types";
import "./PracticeCollection.scss";

interface Params {
  cid: string;
}

interface StateProps {
  question: Types.QuestionState;
}

interface ActionProps {
  setCurQuestion: (cid: string, question: QAPIResp) => Types.Action;
}

class PracticeCollection extends PureComponent<
  StateProps & RouteComponentProps<Params> & ActionProps
> {
  public state: ComponentState = {
    currentAnswer: "",
  };

  private qsetId = this.props.match.params.cid;
  public async componentDidMount(): Promise<void> {
    let qid;
    if (this.props.question[this.qsetId]) {
      qid = this.props.question[this.qsetId].id;
    } else {
      const resp = await axios.get(`/api/score/next/${this.qsetId}`);
      qid = resp.data.qid;
    }
    const resp = await axios.get(`/api/question/qset/${this.qsetId}/${qid}`);
    const question = resp.data;
    if (!this.props.question[this.qsetId]) {
      this.props.setCurQuestion(this.qsetId, {
        id: question.id,
        q: question.question,
        a: question.answer,
        performance: question.performance,
      });
    }
    this.setState({ currentAnswer: question.answer });
  }

  private renderQuestion(): ReactNode {
    return this.props.question[this.qsetId] ? (
      <h1 className="subtitle question">
        {this.props.question[this.qsetId].q}
      </h1>
    ) : null;
  }

  private answerChange = (event: React.FormEvent<any>): void => {
    const elem = event.target as HTMLInputElement;
    this.setState((): object => {
      return {
        answer: elem.value,
      };
    });
  };

  private submitAction = async (): Promise<void> => {
    this.componentDidMount();
    const qid = this.props.question[this.qsetId]
      ? this.props.question[this.qsetId].id
      : 0;
    const resp = await axios.post("/api/score/", {
      qid,
      ans: this.state.answer,
    });
    this.props.history.push("/score/" + this.qsetId, {
      score: resp.data.similarity,
      submitted: this.state.answer,
      actual: this.state.currentAnswer,
    });
  };

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <div className="container">
          {this.renderQuestion()}
          <textarea
            className="input panel-block"
            value={this.state.answer}
            onChange={this.answerChange}
          />
          <button
            onClick={this.submitAction}
            className="button action is-dark is-medium is-outlined sub-button"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ question }: Types.State): object {
  return { question };
}

export default compose(
  connect(mapStateToProps, { setCurQuestion }),
  withRouter
)(PracticeCollection);
