import React, { useEffect, ReactElement } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { NewCollection } from "../../../@types";

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
  initVal = null,
}: OwnProps & InjectedFormProps): ReactElement {
  if (initVal !== null)
    useEffect((): void => {
      initialize({ title: initVal });
    }, []);
  useEffect((): void => {});
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

export default reduxForm<{}, OwnProps>({ form: "CollectionForm" })(
  CollectionForm
);
