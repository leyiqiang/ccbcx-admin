import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionSettings from '../../components/question/QuestionSettings'
import WithLoading from '../../components/WithLoading'
import AlertMessage from '../../components/AlertMessage'
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
      errorMessage,
      successMessage,
    } = this.props
    const QuestionWithLoading = WithLoading(QuestionSettings)
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
      </div>
    )
  }
}
export default QuestionSettingsPage