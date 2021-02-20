import "./ScorePage.scss";
import React, { PureComponent, ComponentState, ReactNode } from "react";
import axios from "axios";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { setCurQuestion } from "../../actions";
import { QAPIResp } from "../../@types";
import Header from "../Header";
import { connect } from "react-redux";

interface Params {
  cid: string;
  qset_id: string;
}

interface StateProps {
  question: Types.QuestionState;
  score: number;
}

interface ActionProps {
  setCurQuestion: (cid: string, question: QAPIResp) => Types.Action;
}

class ScorePage extends PureComponent<
  StateProps & RouteComponentProps<Params> & ActionProps
> {
  public state: ComponentState = {
    answer: "",
  };

  private getNextQuestion = async (): Promise<void> => {
    const resp = await axios.get(
      `/api/score/next/${this.props.match.params.qset_id}`
    );
    const question = resp.data;
    this.props.setCurQuestion(question.qset_id, {
      id: question.id,
      q: question.q,
      a: question.a,
      performance: question.performance,
    });
    this.props.history.push(`/practice/${this.props.match.params.qset_id}`);
  };

  private getColor(): string {
    const score = this.props.location.state.score;
    if (score < 30) {
      return "red";
    }
    if (score < 60) {
      return "yellow";
    }
    return "green";
  }

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="title">Given Answer</div>
          <div className="box">{this.props.location.state.submitted}</div>
          <div className="title">Actual Answer</div>
          <div className="box">{this.props.location.state.actual}</div>
          <div className="title">Score</div>
          <h1
            className="subtitle is-1 center"
            style={{ color: this.getColor() }}
          >
            {this.props.location.state.score}/100
          </h1>
          <button
            onClick={this.getNextQuestion}
            className="button is-dark is-medium is-outlined"
          >
            Next Question
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
)(ScorePage);
