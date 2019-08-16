import React, { useEffect } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface OwnProps {
  submitAction: (FormProps: Types.NewCollection) => void;
  renderJSX: any;
  btnText: string;
  initVal?: string | null;
}

function CollectionForm({
  submitAction,
  renderJSX,
  btnText,
  initialize,
  handleSubmit,
  initVal = null
}: OwnProps & InjectedFormProps) {
  if (initVal !== null)
    useEffect(() => {
      initialize({ title: initVal });
    }, []);
    useEffect(() => {

    })
  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <button className="button is-dark is-medium formbtn">{btnText}</button>
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
        {renderJSX}
      </nav>
    </form>
  );
}

export default reduxForm<{}, OwnProps>({ form: 'CollectionForm' })(
  CollectionForm
);
