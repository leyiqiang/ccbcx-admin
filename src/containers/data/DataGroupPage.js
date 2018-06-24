import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import ProgressButton from '../../components/question/ProgressButton'
import _ from 'lodash'
import { ListGroup } from 'reactstrap'

@inject(stores => {
  const { dataGroupStore, groupListStore, loadingStore } = stores
  const { isGroupListLoading } = loadingStore
  const { getGroupList, groupList, redirectToGroupProgress} = groupListStore
  const {
    successMessage,
    errorMessage,
  } = dataGroupStore
  return {
    successMessage,
    errorMessage,
    getGroupList,
    groupList,
    isGroupListLoading,
    redirectToGroupProgress,
  }
})
@observer
class DataGroupPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionList = this.renderQuestionList.bind(this)
  }

  static propTypes = {
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    isGroupListLoading: PropTypes.bool.isRequired,
    getGroupList: PropTypes.func.isRequired,
    groupList: MobxPropTypes.observableArray,
    redirectToGroupProgress: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getGroupList()
  }

  renderQuestionList() {
    const {
      groupList,
      isGroupListLoading,
      redirectToGroupProgress,
    } = this.props
    const questionListView = _.map(groupList, (g) => {
      const onRedirectToGroupProgress = () => {
        redirectToGroupProgress({groupName: g.groupName})
      }
      return (
        <ProgressButton
          key={g.groupName}
          content={g.groupName}
          onRedirect={onRedirectToGroupProgress}/>
      )
    })
    if (isGroupListLoading) {
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

export default DataGroupPage