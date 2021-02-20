import "./CollectionForm.scss";
import React, { useEffect, ReactElement } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { NewCollection } from "../../../@types";

interface OwnProps {
  submitAction: (FormProps: Types.NewCollection) => void;
  renderJSX: any;
  renderErr: any;
  btnText: string;
  initVal?: string | null;
}

function CollectionForm({
  submitAction,
  renderJSX,
  btnText,
  initialize,
  handleSubmit,
  renderErr,
  initVal = null,
}: OwnProps & InjectedFormProps): ReactElement {
  if (initVal !== null)
    useEffect((): void => {
      initialize({ title: initVal });
    }, []);
  useEffect((): void => {});
  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <button className="button submit is-dark is-medium formbtn is-outlined move-top">
        {btnText}
      </button>
      <fieldset className="field">
        <label className="label namelabel">Name</label>
        <div className="control">
          <Field
            name="title"
            maxLength="255"
            type="text"
            component="input"
            autoComplete="none"
            className="input is-medium"
          />
        </div>
        {renderErr}
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
