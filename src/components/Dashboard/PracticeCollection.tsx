import React, { PureComponent, ComponentState, ReactNode } from "react";
import axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Header from "../Header";
import { setCurQuestion } from "../../actions";
import { QAPIResp } from "../../@types";
import TextareaAutosize from "react-autosize-textarea/lib";

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
    currentAnswer: ""
  };

  private qsetId = this.props.match.params.cid;
  public async componentDidMount(): Promise<void> {
    let qid;
    if (this.props.question[this.qsetId]) {
      qid = this.props.question[this.qsetId];
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
        performance: question.performance
      });
    }
  }

  private renderQuestion(): ReactNode {
    return this.props.question[this.qsetId] ? (
      <h1>{this.props.question[this.qsetId].q}</h1>
    ) : null;
  }

  private answerChange = (event: React.FormEvent<any>): void => {
    const elem = event.target as HTMLInputElement;
    this.setState((): object => {
      return {
        answer: elem.value
      };
    });
  };

  private submitAction = async (): Promise<void> => {
    const qid = this.props.question[this.qsetId]
      ? this.props.question[this.qsetId].id
      : 0;
    const resp = await axios.post("/api/score/", {
      qid,
      ans: this.state.answer
    });
    this.props.history.push("/score/" + this.qsetId, {
      score: resp.data.similarity
    });
  };

  public render(): ReactNode {
    return (
      <div>
        <Header />
        {this.renderQuestion()}
        <TextareaAutosize
          className="input panel-block"
          value={this.state.answer}
          onChange={this.answerChange}
        />
        <button
          //onClick={}
          className="button is-dark is-medium"
        >
          Show Answer
        </button>
        <button
          onClick={this.submitAction}
          className="button is-dark is-medium"
        >
          Submit
        </button>
      </div>
    );
  }
}

function mapStateToProps({ question }: Types.State): object {
  return { question };
}

export default compose(
  connect(
    mapStateToProps,
    { setCurQuestion }
  ),
  withRouter
)(PracticeCollection);
