import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface OwnProps {
  submitAction: (FormProps: Types.FormQuestion) => void;
}

function CollectionForm(props: any) {
  return (<form>

  </form>) ;
}

export default reduxForm<any>({ form: 'QuestionForm' })(CollectionForm);
