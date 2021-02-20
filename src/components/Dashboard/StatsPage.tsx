import "./StatsPage.scss";
import React, { PureComponent, ReactNode } from "react";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header";
import { emptySearchText } from "../../actions";
import axios, { AxiosResponse } from "axios";
import CanvasJSReact from "./utils/canvasjs.react";
import ReactPaginate from "react-paginate";

interface StateProps {
  search: string;
}

interface Params {
  qset_id: string;
}

interface ActionProps {
  emptySearchText: () => Types.Action;
}

interface ComponentState {
  questions: any;
  numPages: number;
  currentPage: number;
}

class StatsPage extends PureComponent<
  StateProps & ComponentState & ActionProps & RouteComponentProps<Params>
> {
  private static pageSize = 5;
  public state: ComponentState = {
    questions: { qsetTitle: "", questions: [] },
    numPages: 0,
    currentPage: 1,
  };

  public async componentDidMount(): Promise<void> {
    this.props.emptySearchText();
    const collectionResp: AxiosResponse<any> = await axios.get(
      `/api/question/qset/performance/${this.props.match.params.qset_id}`
    );
    this.setState({ questions: collectionResp.data });
    this.setState({
      numPages: this.state.questions.questions.length / StatsPage.pageSize,
    });
  }

  private average(array: any[]): number | string {
    let i = 0,
      sum = 0,
      len = array.length;
    if (len === 0) {
      return "N/A";
    }
    while (i < len) {
      sum = sum + array[i++].score;
    }
    return Math.round(sum / len);
  }

  private renderChart = (pArr: any[]): ReactNode => {
    if (!pArr) {
      return <div></div>;
    }
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    // @ts-ignore
    const data: any = [];
    let i = 0;
    while (i < pArr.length) {
      data.push({ x: i, y: pArr[i++].score });
    }
    const options: any = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Summary of Previous Attempts",
      },
      axisY: {
        title: "Score",
        suffix: "%",
        minimum: 0,
        maximum: 100,
      },
      axisX: {
        title: "Attempt #",
        prefix: "",
        interval: 2,
      },
      data: [
        {
          type: "line",
          toolTipContent: "{x}: {y}%",
          dataPoints: data,
        },
      ],
    };

    return <CanvasJSChart options={options} />;
  };

  private setActiveCollections(collection: any[]): any[] {
    const startIndex = (this.state.currentPage - 1) * StatsPage.pageSize;
    const endIndex = startIndex + StatsPage.pageSize;
    return collection.slice(startIndex, endIndex);
  }

  private searchFilter(): any {
    if (this.props.search) {
      const filtered = this.state.questions.questions.filter(
        (s: any): boolean => s.question.includes(this.props.search)
      );
      if (
        Math.ceil(filtered.length / StatsPage.pageSize) * StatsPage.pageSize <
        this.state.currentPage * StatsPage.pageSize
      ) {
        this.setState({
          currentPage: Math.ceil(filtered.length / StatsPage.pageSize),
        });
      }
      this.setState({
        numPages: Math.ceil(filtered.length / StatsPage.pageSize),
      });
      return filtered;
    }
    this.setState({
      numPages: Math.ceil(
        this.state.questions.questions.length / StatsPage.pageSize
      ),
    });
    return this.state.questions.questions;
  }

  private renderPerf = (): JSX.Element[] => {
    return this.setActiveCollections(this.searchFilter()).map(
      (question: any): JSX.Element => (
        <div className="box stats" key={question.id}>
          <nav className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Question</p>
                <p className="title">{question.question}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Attempts</p>
                <p className="title">{question.attempts.length}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Average Score</p>
                <p className="title">{this.average(question.attempts)}</p>
              </div>
            </div>
          </nav>
          <div>{this.renderChart(question.attempts)}</div>
        </div>
      )
    );
  };

  private handlePageClick = (data: any): void => {
    let selected = data.selected + 1;
    this.setState({ currentPage: selected });
  };

  private renderPaginate = (): ReactNode => {
    if (this.state.numPages > 1) {
      return (
        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={"..."}
          breakClassName={"break-me"}
          disabledClassName={"hidden-element"}
          pageCount={this.state.numPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      );
    }
  };

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <div className="title setName">{this.state.questions.qsetTitle}</div>
        {this.renderPerf()}
        {this.renderPaginate()}
      </div>
    );
  }
}

function mapStateToProps({ search }: Types.State): Types.SearchState {
  return { search };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { emptySearchText })
)(StatsPage);
