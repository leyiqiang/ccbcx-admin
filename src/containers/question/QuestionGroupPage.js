import React, { Component } from 'react'
// import { ListGroup } from 'reactstrap'
import { Tabs, Tab } from 'react-bootstrap'
import {inject, observer, PropTypes as MobxPropTypes} from 'mobx-react/index'
import PropTypes from 'prop-types'
import _ from 'lodash'

const GROUP_ONE = 'GROUP_ONE'
const GROUP_TWO = 'GROUP_TWO'
const GROUP_THREE = 'GROUP_THREE'
// const GROUP_META = 'GROUP_META'

@inject(stores => {
  const { questionGroupStore, loadingStore } = stores
  const {
    questionGroup,
    getQuestionGroup,
    errorMessage,
  } = questionGroupStore
  const { isQuestionGroupLoading } = loadingStore
  return {
    questionGroup,
    getQuestionGroup,
    isQuestionGroupLoading,
    errorMessage,
  }
})
@observer
class QuestionGroupPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionGroup = this.renderQuestionGroup.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: GROUP_ONE,
    }
  }

  static propTypes = {
    questionGroup: MobxPropTypes.observableArray,
    isQuestionGroupLoading: PropTypes.bool.isRequired,
    getQuestionGroup: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }

  componentWillMount() {
    this.props.getQuestionGroup()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  renderQuestionGroup() {
    const { questionGroup } = this.props
    const questionGroupView = _.map(questionGroup, (group) => {
      // const onRedirectToGroupDetails = () => {
      //   redirectToDetails({ groupName: g.groupName })
      // }
      return(
        <Tab
          eventKey={group.groupType}
          key={group.groupType}
          title={group.groupName}>
            Render question list by gorupType here
        </Tab>)
    })
    return (
      <Tabs defaultActiveKey={GROUP_ONE} id='question-group-tabs'>
        {questionGroupView}
      </Tabs>
    )
  }
  render() {
    const { isQuestionGroupLoading } = this.props
    if (isQuestionGroupLoading) {
      return <h3>Loading...</h3>
    }

    return (
      <div>
        {/*{this.renderErrorMessage()}*/}
        <h3>题目</h3>
        {this.renderQuestionGroup()}
      </div>
    )
  }
}

export default QuestionGroupPage