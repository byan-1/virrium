import "./Signin.scss";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import EmailFields from "./EmailFields";
import OAuthButtons from "./OAuthButtons";
import Header from "../Header";
import { SIGNUP_PATH, SIGNIN_PAGE } from "../../config";

function Signin(): ReactElement {
  return (
    <div>
      <Header page="auth" />
      <section className="section vcenter">
        <div className="container is-widescreen">
          <h1 className="title">Virrium</h1>
          <h2 className="subtitle">
            Don&apos;t have an account?{" "}
            <Link to={SIGNUP_PATH}>Sign up here</Link>
          </h2>
          <div className="columns">
            <div className="column">
              <EmailFields page={SIGNIN_PAGE} />
            </div>
            <div className="column is-half">
              <OAuthButtons />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
