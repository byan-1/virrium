import React, { Component } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface OwnProps {
  submitAction: (FormProps: Types.FormQuestion) => void;
}

class QuestionForm extends Component<
  OwnProps & InjectedFormProps<{}, OwnProps>
> {
  wrappedSubmit = (formProps: Types.FormQuestion) => {
    this.props.submitAction(formProps);
    this.props.reset();
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.wrappedSubmit)}>
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
    );
  }
}

export default reduxForm<{}, OwnProps>({ form: 'QuestionForm' })(QuestionForm);
