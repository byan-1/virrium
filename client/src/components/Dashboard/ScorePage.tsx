import React, { PureComponent, ComponentState } from "react";
import axios from "axios";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import PracticeCollection from "./PracticeCollection";
import { setCurQuestion } from "../../actions";
import { QAPIResp } from "../../@types";
import Header from "../Header";
import { connect } from "react-redux";

//display submitted and correct answer
//display given score
//next question button that generates a random question
//based on the relative scores of current questions
//and changes the current question state

interface Params {
  cid: string;
  qset_id: string;
}

type StateProps = {
  question: Types.QuestionState;
  score: number;
};

interface ActionProps {
  setCurQuestion: (cid: string, question: QAPIResp) => Types.Action;
}

class ScorePage extends PureComponent<
  StateProps & RouteComponentProps<Params> & ActionProps
> {
  state: ComponentState = {
    answer: ""
  };

  getNextQuestion = async () => {
    const resp = await axios.get(
      `/api/score/next/${this.props.match.params.qset_id}`
    );
    console.log(resp.data);
    const question = resp.data;
    this.props.setCurQuestion(question.qset_id, {
      id: question.id,
      q: question.q,
      a: question.a,
      performance: question.performance
    });
    this.props.history.push("/practice/" + this.props.match.params.qset_id);
  };

  render() {
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

function mapStateToProps({ question }: Types.State) {
  return { question };
}

export default compose(
  connect(
    mapStateToProps,
    { setCurQuestion }
  ),
  withRouter
)(ScorePage);
