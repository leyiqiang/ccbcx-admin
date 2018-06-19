import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionSettings from '../../components/question/QuestionSettings'
import WithLoading from '../../components/WithLoading'
import AlertMessage from '../../components/AlertMessage'
import QuestionMap from '../../components/question/QuestionMap'
// import _ from 'lodash'
// import WithLoading from 'src/components/WithLoading'

@inject(stores => {
  const { questionStore, questionGroupStore, loadingStore } = stores
  const {
    getQuestion,
    updateQuestion,
    question,
    errorMessage,
    successMessage,
    redirectToQuestionList,
    updateQuestionLocation,
  } = questionStore
  const { questionList, getQuestionList } = questionGroupStore
  const { isQuestionInfoLoading, isQuestionListLoading } = loadingStore
  return {
    getQuestion,
    questionList,
    updateQuestion,
    question,
    errorMessage,
    successMessage,
    getQuestionList,
    updateQuestionLocation,
    redirectToQuestionList,
    isQuestionInfoLoading,
    isQuestionListLoading,
  }
})
@observer
class QuestionSettingsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    match: PropTypes.object,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    question: PropTypes.object,
    questionList: MobxPropTypes.observableArray,
    getQuestionList: PropTypes.func.isRequired,
    updateQuestionLocation: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    isQuestionInfoLoading: PropTypes.bool.isRequired,
    isQuestionListLoading: PropTypes.bool.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { questionNumber }  = this.props.match.params
    this.props.getQuestion({questionNumber})
    this.props.getQuestionList()
  }

  render() {
    const {
      question,
      updateQuestion,
      updateQuestionLocation,
      isQuestionInfoLoading,
      redirectToQuestionList,
      errorMessage,
      successMessage,
      questionList,
      isQuestionListLoading,
    } = this.props
    const QuestionWithLoading = WithLoading(QuestionSettings)
    const QuestionMapWithLoading = WithLoading(QuestionMap)
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        <QuestionWithLoading
          errorMessage={errorMessage}
          successMessage={successMessage}
          isLoading={isQuestionInfoLoading}
          updateQuestion={updateQuestion}
          redirectToQuestionList={redirectToQuestionList}
          {...question}
        />
        <div className='container'>
          <div className="row justify-content">
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <QuestionMapWithLoading
                questionList={questionList}
                updateQuestionLocation={updateQuestionLocation}
                isLoading={isQuestionInfoLoading}
                {...question}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default QuestionSettingsPage