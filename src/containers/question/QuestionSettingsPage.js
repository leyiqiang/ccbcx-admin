import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionSettings from '../../components/question/QuestionSettings'
import WithLoading from '../../components/WithLoading'
// import _ from 'lodash'
// import WithLoading from 'src/components/WithLoading'

@inject(stores => {
  const { questionStore, loadingStore } = stores
  const {
    getQuestion,
    updateQuestion,
    question,
    errorMessage,
    successMessage,
    redirectToQuestionList,
  } = questionStore
  const { isQuestionInfoLoading } = loadingStore
  return {
    getQuestion,
    updateQuestion,
    question,
    errorMessage,
    successMessage,
    redirectToQuestionList,
    isQuestionInfoLoading,
  }
})
@observer
class QuestionSettingsPage extends Component {
  constructor(props) {
    super(props)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
    this.renderSuccessMessage = this.renderSuccessMessage.bind(this)
  }

  static propTypes = {
    match: PropTypes.object,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    question: PropTypes.object,
    getQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    isQuestionInfoLoading: PropTypes.bool.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
  }

  renderErrorMessage() {
    if (_.isNil(this.props.errorMessage)) {
      return
    } else {
      return (
        <div className='alert alert-danger' role='alert'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  renderSuccessMessage() {
    if(_.isNil(this.props.successMessage)) {
      return
    } else {
      return (
        <div className='alert alert-success' role='alert'>
          {this.props.successMessage}
        </div>
      )
    }
  }

  componentWillMount() {
    const { questionNumber }  = this.props.match.params
    this.props.getQuestion({questionNumber})
  }

  render() {
    const {
      question,
      updateQuestion,
      isQuestionInfoLoading,
      redirectToQuestionList,
    } = this.props
    const QuestionWithLoading = WithLoading(QuestionSettings)
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderSuccessMessage()}
        <QuestionWithLoading
          isLoading={isQuestionInfoLoading}
          updateQuestion={updateQuestion}
          redirectToQuestionList={redirectToQuestionList}
          {...question}
        />
      </div>
    )
  }
}
export default QuestionSettingsPage