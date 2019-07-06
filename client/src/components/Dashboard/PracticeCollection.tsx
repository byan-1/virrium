import React, { PureComponent, ComponentState } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { QUESAPI_PATH } from '../../config';
import Header from '../Header';
import { setCurQuestion } from '../../actions';
import { QAPIResp } from '../../@types';
import TextareaAutosize from 'react-autosize-textarea/lib';

interface Params {
  cid: string;
}

type StateProps = {
  question: Types.QuestionState;
};

interface ActionProps {
  setCurQuestion: (cid: string, question: QAPIResp) => Types.Action;
}

//todo
//title page gets the default first question through special flag
//render the question
//submit button shows answer/score
//next question increments current question to the next highest id

class PracticeCollection extends PureComponent<
  StateProps & RouteComponentProps<Params> & ActionProps
> {
  state: ComponentState = {
    answer: ''
  };

  colId = this.props.match.params.cid;
  async componentDidMount() {
    const qid = this.props.question[this.colId]
      ? this.props.question[this.colId].id
      : 0;
    const resp = await axios.get(`${QUESAPI_PATH}qset/${this.colId}/${qid}`);
    this.props.setCurQuestion(this.colId, resp.data);
  }

  renderQuestion() {
    return this.props.question[this.colId] ? (
      <h1>{this.props.question[this.colId].q}</h1>
    ) : null;
  }

  answerChange = (event: React.FormEvent<any>) => {
    const elem = event.target as HTMLInputElement;
    this.setState(() => {
      return {
        answer: elem.value
      };
    });
  };

  submitAction = async () => {
    const qid = this.props.question[this.colId]
      ? this.props.question[this.colId].id
      : 0;
    const resp = await axios.post('/api/score/', {
      qid,
      ans: this.state.answer
    });
    console.log(resp.data);
  };

  render() {
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

function mapStateToProps({ question }: Types.State) {
  return { question };
}

export default compose(
  connect(
    mapStateToProps,
    { setCurQuestion }
  ),
  withRouter
)(PracticeCollection);
