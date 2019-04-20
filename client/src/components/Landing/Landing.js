import './Landing.scss';
import React from 'react';
import Header from '../Header/Header';

const Landing = () => {
  return (
    <section className="hero is-light is-fullheight">
      <Header />
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Neuriv</h1>
          <h2 className="subtitle">Quiz yourself</h2>
        </div>
      </div>
    </section>
  );
};

export default Landing;
