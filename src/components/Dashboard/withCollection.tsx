import React, { PureComponent, ReactElement, ReactNode } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { ReactComponentLike } from "prop-types";
import shortid from "shortid";

interface ComponentState {
  questions: Types.QuestionsReq;
}

function withCollection(WrappedComponent: ReactComponentLike): object {
  class CollectionWrapper extends PureComponent {
    public state: ComponentState = {
      questions: {}
    };

    private setQuestions = (questions: Types.QuestionsReq): void => {
      this.setState({ questions });
    };

    private questionChange = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      const elem = event.target as HTMLInputElement;
      this.setState((prevState: ComponentState): ComponentState => {
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

    private answerChange = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      const elem = event.target as HTMLInputElement;
      this.setState((prevState: ComponentState): ComponentState => {
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

    private addQuestion = ({ question, answer }: Types.FormQuestion): void => {
      const id = shortid.generate();
      this.setState((prevState: ComponentState): ComponentState => {
        return {
          questions: {
            ...prevState.questions,
            [id]: { question, answer, newQuestion: true }
          }
        };
      });
    };

    private removeQuestion = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // eslint-disable-next-line no-unused-vars
      const { [id]: _, ...qState } = this.state.questions;
      this.setState((): ComponentState => {
        return {
          questions: qState
        };
      });
    };

    public renderQuestions = (): JSX.Element[] => {
      const qArr: JSX.Element[] = [];
      Object.keys(this.state.questions).forEach((id): void => {
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

    public render(): ReactNode {
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
