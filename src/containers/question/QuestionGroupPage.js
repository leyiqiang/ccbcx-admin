import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { Tabs, Tab } from 'react-bootstrap'
import {inject, observer, PropTypes as MobxPropTypes} from 'mobx-react/index'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionGroupSettings from '../../components/question/QuestionGroupSettings'



@inject(stores => {
  const { questionGroupStore, loadingStore } = stores
  const {
    questionGroup,
    getQuestionGroup,
    updateQuestionGroup,
    activeKey,
    setActiveKey,
    successMessage,
    errorMessage,
  } = questionGroupStore
  const { isQuestionGroupLoading } = loadingStore
  return {
    questionGroup,
    getQuestionGroup,
    updateQuestionGroup,
    isQuestionGroupLoading,
    activeKey,
    setActiveKey,
    successMessage,
    errorMessage,
  }
})
@observer
class QuestionGroupPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionGroup = this.renderQuestionGroup.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
    this.onTabSelect = this.onTabSelect.bind(this)
    this.renderSuccessMessage = this.renderSuccessMessage.bind(this)
  }

  static propTypes = {
    questionGroup: MobxPropTypes.observableArray,
    activeKey: PropTypes.number.isRequired,
    setActiveKey: PropTypes.func.isRequired,
    isQuestionGroupLoading: PropTypes.bool.isRequired,
    updateQuestionGroup: PropTypes.func.isRequired,
    getQuestionGroup: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }

  componentWillMount() {
    this.props.getQuestionGroup()
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

  onTabSelect(key) {
    this.props.setActiveKey(key)
  }

  renderQuestionGroup() {
    const { questionGroup, updateQuestionGroup } = this.props
    return _.map(questionGroup, (g) => {
      return (
        <Tab
          key={g.groupType}
          eventKey={g.groupType}
          title={g.groupName}>
          <Jumbotron>
            <QuestionGroupSettings {...g} updateQuestionGroup={updateQuestionGroup}/>
          </Jumbotron>
        </Tab>)
    })
  }

  renderTabs() {
    const { activeKey } = this.props
    return(
      <Tabs
        defaultActiveKey={activeKey}
        id='question-group-tabs'
        onSelect={this.onTabSelect}
      >
        {this.renderQuestionGroup()}
      </Tabs>)
  }
  render() {
    const { isQuestionGroupLoading } = this.props
    return (
      <div>
        <h3>题目</h3>
        {this.renderErrorMessage()}
        {this.renderSuccessMessage()}
        {isQuestionGroupLoading? <h3>Loading...</h3> : this.renderTabs()}
      </div>
    )
  }
}

export default QuestionGroupPage