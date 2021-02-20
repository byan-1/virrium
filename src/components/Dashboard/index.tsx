import "./index.scss";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Collection from "./Collection";

class Dashboard extends Component {
  public componentDidMount(): void {
    document.title = "Virrium";
  }
  public render(): ReactNode {
    return (
      <div className="page">
        <Header />
        <div className="questions">
          <Collection />
        </div>
      </div>
    );
  }
}

export default connect(null)(Dashboard);
