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
    answer: ""
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
      performance: question.performance
    });
    this.props.history.push(`/practice/${this.props.match.params.qset_id}`);
  };

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <h1>{this.props.location.state.score}</h1>
        <button
          onClick={this.getNextQuestion}
          className="button is-dark is-medium"
        >
          Next Question
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
)(ScorePage);
