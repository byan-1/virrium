import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import Header from '../Header';
import axios from 'axios';
import { Link, RouteComponentProps } from 'react-router-dom';
import shortid from 'shortid';

type StateProps = {
  auth: Types.UserState;
};

interface ComponentState {
  questions: Array<Types.Questions>;
}

class NewCollection extends Component<
  StateProps & RouteComponentProps & InjectedFormProps,
  ComponentState
> {
  state: ComponentState = {
    questions: []
  };

  createCollection = async ({ title }: Types.NewCollection) => {
    if (this.props.auth) {
      await axios.post('/api/question/' + this.props.auth.id, {
        title,
        questions: this.state.questions
      });
      this.props.history.push('/dashboard');
    }
  };

  renderQuestions() {
    return this.state.questions.map((question: Types.Questions) => {
      return (
        <p key={question.id} className="panel-block">
          {question.question}
          <button
            onClick={() => this.removeQuestion(question.id)}
            className="button is-dark is-medium"
          >
            Delete
          </button>
        </p>
      );
    });
  }

  addQuestion = ({ question, answer }: Types.Questions) => {
    this.props.reset();
    this.setState(prevState => ({
      questions: [
        ...prevState.questions,
        { id: shortid.generate(), question, answer }
      ]
    }));
  };

  //to be refactored for performance, put in subcomponent
  removeQuestion(id: string) {
    this.setState(() => {
      return {
        questions: this.state.questions.filter(question => id !== question.id)
      };
    });
  }

  render() {
    return (
      <div>
        <Header authPage={false} />
        <div className="container">
          <h1>Create a new collection</h1>
          <form onSubmit={this.props.handleSubmit(this.createCollection)}>
            <button className="button is-dark is-medium formbtn">
              Create Collection
            </button>
            <fieldset className="field">
              <label className="label">Name</label>
              <div className="control">
                <Field
                  name="title"
                  type="text"
                  component="input"
                  autoComplete="none"
                  className="input is-medium"
                />
              </div>
            </fieldset>
            <nav className="panel">
              <p className="panel-heading">Questions</p>
              {this.renderQuestions()}
            </nav>
          </form>
          <form onSubmit={this.props.handleSubmit(this.addQuestion)}>
            <Field
              name="question"
              className="input"
              type="text"
              component="input"
              placeholder="Type question here"
            />
            <Field
              name="answer"
              type="text"
              component="textarea"
              className="textarea"
              placeholder="Type answer here"
            />
            <button type="submit" className="button is-dark is-medium formbtn">
              Add Question
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'createcollection' })
)(NewCollection);
