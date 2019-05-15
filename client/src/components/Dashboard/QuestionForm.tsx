import React, { Component } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface OwnProps {
  submitAction: (FormProps: Types.FormQuestion) => void;
}

function QuestionForm(props: OwnProps & InjectedFormProps) {
  const wrappedSubmit = (formProps: Types.FormQuestion) => {
    props.submitAction(formProps);
    props.reset();
  };

  return (
    <form onSubmit={props.handleSubmit(wrappedSubmit)}>
      <Field
        name="question"
        className="input"
        type="text"
        component="input"
        placeholder="Type question here"
        autoComplete="off"
      />
      <Field
        name="answer"
        type="text"
        component="textarea"
        className="textarea"
        placeholder="Type answer here"
        autoComplete="off"
      />
      <button type="submit" className="button is-dark is-medium formbtn">
        Add Question
      </button>
    </form>
  );
}

export default reduxForm<{}, OwnProps>({ form: 'QuestionForm' })(QuestionForm);
