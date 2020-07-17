import React, { ReactNode } from "react";
import Header from "./Header";

function Landing(): ReactNode {
  return (
    <section className="hero is-light is-fullheight">
      <Header />
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Virrium</h1>
          <h2 className="subtitle">Quiz yourself</h2>
        </div>
      </div>
    </section>
  );
}

export default Landing;
