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

interface Params {
  qid: string;
}

type StateProps = {
  auth: Types.UserState;
};

interface ComponentState {
  title: string | null;
  id: number | null;
}

class EditCollection extends PureComponent<
  StateProps & Types.InjectedCollectionProps & RouteComponentProps<Params>
> {
  state: ComponentState = {
    title: null,
    id: null
  };

  async componentDidMount() {
    const resp = await axios.get(
      `${QUESAPI_PATH}qset/${this.props.match.params.qid}`
    );
    this.setState({ title: resp.data.title });
    this.setState({ id: resp.data.id });
    const questions: Types.Questions = {};
    resp.data.questions.map((q: Types.QAPIResp) => {
      questions[q.id] = { question: q.q, answer: q.a };
    });
    this.props.setQuestions(questions);
  }

  createCollection = async ({ title }: Types.NewCollection) => {
    await axios.patch(QUESAPI_PATH + 'qset/' + this.state.id, {
      title,
      questions: this.props.questions
    });
    this.props.history.push(DASHBOARD_PATH);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Edit collection</h1>
          {this.state.title === null ? null : (
            <CollectionForm
              btnText="Edit"
              submitAction={this.createCollection}
              renderJSX={this.props.renderQuestions()}
              initVal={this.state.title}
            />
          )}
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
  connect(mapStateToProps),
  withRouter,
  withCollection
)(EditCollection);
