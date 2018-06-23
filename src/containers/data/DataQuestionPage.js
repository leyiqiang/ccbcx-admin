import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import QuestionProgressButton from '../../components/question/QuestionProgressButton'
import _ from 'lodash'
import { ListGroup } from 'reactstrap'

@inject(stores => {
  const { dataQuestionStore, questionGroupStore, loadingStore } = stores
  const { isQuestionListLoading } = loadingStore
  const { getQuestionList, questionList, redirectToProgress} = questionGroupStore
  const {
    successMessage,
    errorMessage,
  } = dataQuestionStore
  return {
    successMessage,
    errorMessage,
    getQuestionList,
    questionList,
    isQuestionListLoading,
    redirectToProgress,
  }
})
@observer
class DataQuestionPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionList = this.renderQuestionList.bind(this)
  }

  static propTypes = {
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    isQuestionListLoading: PropTypes.bool.isRequired,
    getQuestionList: PropTypes.func.isRequired,
    questionList: MobxPropTypes.observableArray,
    redirectToProgress: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getQuestionList()
  }

  renderQuestionList() {
    const {
      questionList,
      isQuestionListLoading,
      redirectToProgress,
    } = this.props
    const questionListView = _.map(questionList, (q) => {
      const onRedirectToQuestionProgress = () => {
        redirectToProgress({questionNumber: q.questionNumber})
      }
      return (
        <QuestionProgressButton
          key={q.questionNumber}
          questionNumber={q.questionNumber}
          onRedirectToQuestionProgress={onRedirectToQuestionProgress}/>
      )
    })
    if (isQuestionListLoading) {
      return <h3>Loading...</h3>
    }

    return <ListGroup>{questionListView}</ListGroup>
  }


  render() {
    // const {} = this.props
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        {this.renderQuestionList()}
      </div>
    )
  }
}

export default DataQuestionPage