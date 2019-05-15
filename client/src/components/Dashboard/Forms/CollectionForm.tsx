import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface OwnProps {
  submitAction: (FormProps: Types.NewCollection) => void;
  renderJSX: Array<JSX.Element>;
}

function CollectionForm(props: OwnProps & InjectedFormProps) {
  return (
    <form onSubmit={props.handleSubmit(props.submitAction)}>
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
        {props.renderJSX}
      </nav>
    </form>
  );
}

export default reduxForm<{}, OwnProps>({ form: 'QuestionForm' })(
  CollectionForm
);
