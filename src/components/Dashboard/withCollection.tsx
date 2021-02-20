/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "./withCollection.scss";
import React, { PureComponent, ReactNode } from "react";
import { ReactComponentLike } from "prop-types";
import shortid from "shortid";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { emptySearchText } from "../../actions/";

//paginate questions
//search function for questions

//stats page

//change password page
//retrieve password page
interface ComponentState {
  questions: Types.QuestionsReq;
  numPages: number;
  currentPage: number;
}

interface StateProps {
  auth: Types.UserState;
  search: string;
}

interface ActionProps {
  emptySearchText: () => Types.Action;
}

function withCollection(WrappedComponent: ReactComponentLike): object {
  class CollectionWrapper extends PureComponent<StateProps & ActionProps> {
    public componentDidMount(): void {
      this.props.emptySearchText();
    }
    public state: ComponentState = {
      questions: {},
      numPages: 0,
      currentPage: 1,
    };
    private static pageSize = 5;

    private setQuestions = (questions: Types.QuestionsReq): void => {
      this.setState({
        questions,
        numPages: Math.ceil(
          Object.keys(questions).length / CollectionWrapper.pageSize
        ),
      });
    };

    private setActiveQuestions = (
      qArr: JSX.Element[],
      current: number
    ): JSX.Element[] => {
      const startIndex = (current - 1) * CollectionWrapper.pageSize;
      const endIndex = startIndex + CollectionWrapper.pageSize;
      let k = qArr.slice(startIndex, endIndex);
      return k;
    };

    private questionChange = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      const elem = event.target as HTMLInputElement;
      this.setState(
        (prevState: ComponentState): ComponentState => {
          return {
            questions: {
              ...prevState.questions,
              [id]: {
                question: elem.value,
                answer: prevState.questions[id].answer,
              },
            },
            numPages: prevState.numPages,
            currentPage: prevState.currentPage,
          };
        }
      );
    };

    private answerChange = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      const elem = event.target as HTMLInputElement;
      this.setState(
        (prevState: ComponentState): ComponentState => {
          return {
            questions: {
              ...prevState.questions,
              [id]: {
                question: prevState.questions[id].question,
                answer: elem.value,
              },
            },
            numPages: prevState.numPages,
            currentPage: prevState.currentPage,
          };
        }
      );
    };

    private addQuestion = ({ question, answer }: Types.FormQuestion): void => {
      const id = shortid.generate();

      this.setState(
        (prevState: ComponentState): ComponentState => {
          return {
            questions: {
              ...prevState.questions,
              [id]: { question, answer, newQuestion: true },
            },
            numPages:
              (Object.keys(this.state.questions).length + 1) /
              CollectionWrapper.pageSize,
            currentPage: prevState.currentPage,
          };
        }
      );
    };

    private removeQuestion = (event: React.FormEvent<any>): void => {
      const id = event.currentTarget.getAttribute("id");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // eslint-disable-next-line no-unused-vars
      const { [id]: _, ...qState } = this.state.questions;
      this.setState({
        questions: qState,
        numPages:
          (Object.keys(this.state.questions).length - 1) /
          CollectionWrapper.pageSize,
      });
    };

    private renderPaginate = (numPages: number): ReactNode => {
      if (numPages > 1) {
        return (
          <ReactPaginate
            previousLabel={<i className="fas fa-chevron-left"></i>}
            nextLabel={<i className="fas fa-chevron-right"></i>}
            breakLabel={"..."}
            breakClassName={"break-me"}
            disabledClassName={"hidden-element"}
            pageCount={numPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        );
      }
    };

    private handlePageClick = (data: any): void => {
      let selected = data.selected + 1;
      this.setState({ currentPage: selected });
    };

    private searchFilter(qArr: JSX.Element[]): JSX.Element[] {
      if (this.props.search) {
        const filtered = qArr.filter((s): any => {
          return this.state.questions[s.key!].question.includes(
            this.props.search
          );
        });
        if (
          Math.ceil(filtered.length / CollectionWrapper.pageSize) *
            CollectionWrapper.pageSize <
          this.state.currentPage * CollectionWrapper.pageSize
        ) {
          this.setState({
            currentPage: Math.max(
              Math.ceil(filtered.length / CollectionWrapper.pageSize),
              1
            ),
          });
        }
        this.setState({
          numPages: Math.ceil(filtered.length / CollectionWrapper.pageSize),
        });
        return filtered;
      }
      this.setState({
        numPages: Math.ceil(
          Object.keys(this.state.questions).length / CollectionWrapper.pageSize
        ),
      });
      return qArr;
    }

    public renderQuestions = (current: number): JSX.Element[] => {
      let qArr: JSX.Element[] = [];
      Object.keys(this.state.questions).forEach((id): void => {
        qArr.push(
          <div className="questions" key={id}>
            <textarea
              id={id}
              className="input panel-block question"
              value={this.state.questions[id].question}
              onChange={this.questionChange}
            />
            <textarea
              id={id}
              className="input panel-block answer"
              value={this.state.questions[id].answer}
              onChange={this.answerChange}
            />
            <button
              id={id}
              onClick={this.removeQuestion}
              className="button is-danger is-medium is-outlined float-right move-top"
            >
              Delete
            </button>
          </div>
        );
      });
      qArr = this.searchFilter(qArr);
      return this.setActiveQuestions(qArr, current);
    };

    public render(): ReactNode {
      return (
        <div>
          <WrappedComponent
            questions={this.state.questions}
            renderQuestions={this.renderQuestions}
            addQuestion={this.addQuestion}
            removeQuestion={this.removeQuestion}
            setQuestions={this.setQuestions}
            renderPaginate={this.renderPaginate(this.state.numPages)}
            currentPage={this.state.currentPage}
            {...this.props}
          />
        </div>
      );
    }
  }

  function mapStateToProps({
    auth,
    search,
  }: Types.State): Types.AuthState & Types.SearchState {
    return { auth, search };
  }

  return connect(mapStateToProps, { emptySearchText })(CollectionWrapper);
}

export default withCollection;
