import './NewCollection.scss';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import QuestionForm from './Forms/QuestionForm';
import { QUESAPI_PATH, DASHBOARD_PATH } from '../../config';
import CollectionForm from './Forms/CollectionForm';
import withCollection from './withCollection';

type StateProps = {
  auth: Types.UserState;
};

class NewCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps
> {
  createCollection = async ({ title }: Types.NewCollection) => {
    if (this.props.auth) {
      await axios.post(QUESAPI_PATH + this.props.auth.id, {
        title,
        questions: Object.values(this.props.questions)
      });
      this.props.history.push(DASHBOARD_PATH);
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Create a new collection</h1>
          <CollectionForm
            btnText="Create"
            submitAction={this.createCollection}
            renderJSX={this.props.renderQuestions()}
          />
          <QuestionForm submitAction={this.props.addQuestion} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }: Types.State): Types.AuthState {
  return { auth };
}

export default compose(
  withRouter,
  withCollection,
  connect(mapStateToProps)
)(NewCollection);
