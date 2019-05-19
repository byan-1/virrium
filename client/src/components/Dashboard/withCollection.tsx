import React, { PureComponent } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { ReactComponentLike } from 'prop-types';
import shortid from 'shortid';

interface ComponentState {
  questions: Types.Questions;
}

function withCollection(WrappedComponent: ReactComponentLike) {
  class CollectionWrapper extends PureComponent {
    state: ComponentState = {
      questions: {}
    };

    setQuestions = (questions: Types.Questions) => {
      this.setState({ questions });
    };

    questionChange = (event: React.FormEvent<any>) => {
      const id = event.currentTarget.getAttribute('id');
      const elem = event.target as HTMLInputElement;
      this.setState((prevState: ComponentState) => {
        return {
          questions: {
            ...prevState.questions,
            [id]: {
              question: elem.value,
              answer: prevState.questions[id].answer
            }
          }
        };
      });
    };

    answerChange = (event: React.FormEvent<any>) => {
      const id = event.currentTarget.getAttribute('id');
      const elem = event.target as HTMLInputElement;
      this.setState((prevState: ComponentState) => {
        return {
          questions: {
            ...prevState.questions,
            [id]: {
              question: prevState.questions[id].question,
              answer: elem.value
            }
          }
        };
      });
    };

    addQuestion = ({ question, answer }: Types.FormQuestion) => {
      const id = 'NEW-' + shortid.generate();
      this.setState((prevState: ComponentState) => {
        return {
          questions: {
            ...prevState.questions,
            [id]: { question, answer }
          }
        };
      });
    };

    removeQuestion = (event: React.FormEvent<any>) => {
      const id = event.currentTarget.getAttribute('id');
      const { [id]: q, ...qState } = this.state.questions;
      this.setState(() => {
        return {
          questions: qState
        };
      });
    };

    renderQuestions = () => {
      const qArr: Array<JSX.Element> = [];
      Object.keys(this.state.questions).forEach(id => {
        qArr.push(
          <div key={id}>
            <TextareaAutosize
              id={id}
              className="input panel-block"
              value={this.state.questions[id].question}
              onChange={this.questionChange}
            />
            <TextareaAutosize
              id={id}
              className="input panel-block"
              value={this.state.questions[id].answer}
              onChange={this.answerChange}
            />
            <button
              id={id}
              onClick={this.removeQuestion}
              className="button is-dark is-medium"
            >
              Delete
            </button>
          </div>
        );
      });
      return qArr;
    };

    render() {
      return (
        <WrappedComponent
          questions={this.state.questions}
          renderQuestions={this.renderQuestions}
          addQuestion={this.addQuestion}
          removeQuestion={this.removeQuestion}
          setQuestions={this.setQuestions}
          {...this.props}
        />
      );
    }
  }
  return CollectionWrapper;
}

export default withCollection;
