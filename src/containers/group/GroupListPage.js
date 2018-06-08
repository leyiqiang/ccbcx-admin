import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import {joinGroup} from '../../api/group'
import { ListGroup } from 'reactstrap'
import GroupDetailsButton from '../../components/group/GroupDetailsButton'


@inject(stores => {
  const { groupListStore, loadingStore } = stores
  const {
    groupList,
    getGroupList,
    redirectToDetails,
    errorMessage,
  } = groupListStore
  const { isGroupListLoading } = loadingStore
  return {
    groupList,
    isGroupListLoading,
    getGroupList,
    redirectToDetails,
    errorMessage,
  }
})
@observer
class GroupListPage extends Component {
  constructor(props) {
    super(props)
    this.renderGroupList = this.renderGroupList.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
  }

  static propTypes = {
    groupList: MobxPropTypes.observableArray,
    isGroupListLoading: PropTypes.bool.isRequired,
    redirectToDetails: PropTypes.func.isRequired,
    getGroupList: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
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

  componentWillMount() {
    this.props.getGroupList()
  }
  renderGroupList() {
    const {
      groupList,
      isGroupListLoading,
      redirectToDetails,
    } = this.props
    const groupListView = _.map(groupList, (g) => {
      const onRedirectToGroupDetails = () => {
        redirectToDetails({ groupName: g.groupName })
      }
      return(
        <GroupDetailsButton
          key={g.groupName}
          groupName={g.groupName}
          onRedirectToGroupDetails={onRedirectToGroupDetails}/>
      )
    })
    if (isGroupListLoading) {
      return <h3>Loading...</h3>
    }
    return(
      <ListGroup>
        {groupListView}
      </ListGroup>
    )
  }

  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        <h3>组队信息</h3>
        {this.renderGroupList()}
      </div>
    )
  }
}

export default GroupListPage