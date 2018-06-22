import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import WithLoading from 'src/components/WithLoading'
import GroupProfile from 'src/components/group/GroupProfile'
import {Button, Label, Input} from 'reactstrap'

@inject(stores => {
  const { groupStore, loadingStore } = stores
  const {
    groupName,
    groupContact,
    getGroupInfo,
    memberList,
    invitationCode,
    errorMessage,
  } = groupStore
  const { isGroupProfileLoading } = loadingStore
  return {
    groupName,
    groupContact,
    getGroupInfo,
    memberList,
    invitationCode,
    errorMessage,
    isLoading: isGroupProfileLoading,
  }
})
@observer
class GroupDetailsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
    match: PropTypes.object,
    getGroupInfo: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { groupName }  = this.props.match.params
    this.props.getGroupInfo({ groupName })
  }

  render() {
    const GroupProfileWithLoading = WithLoading(GroupProfile)
    return (
      <GroupProfileWithLoading {...this.props} />
    )
  }
}
export default GroupDetailsPage