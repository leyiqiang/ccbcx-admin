import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import WithLoading from 'src/components/WithLoading'
import GroupProfile from 'src/components/group/GroupProfile'
import AlertMessage from '../../components/AlertMessage'
import {Button, Label, Input} from 'reactstrap'

@inject(stores => {
  const { groupStore, loadingStore } = stores
  const {
    groupName,
    groupContact,
    getGroupInfo,
    memberList,
    invitationCode,
    addBlackList,
    errorMessage,
    removeBlackList,
    blockedUntil,
    successMessage,
  } = groupStore
  const { isGroupProfileLoading } = loadingStore
  return {
    groupName,
    groupContact,
    getGroupInfo,
    memberList,
    invitationCode,
    addBlackList,
    blockedUntil,
    removeBlackList,
    successMessage,
    errorMessage,
    isLoading: isGroupProfileLoading,
  }
})
@observer
class GroupDetailsPage extends Component {
  constructor(props) {
    super(props)
    this.onSecondsChange = this.onSecondsChange.bind(this)
    this.onAddBlackList = this.onAddBlackList.bind(this)
    this.onRemoveBlackList = this.onRemoveBlackList.bind(this)
    this.state = {
      seconds: 0,
    }
  }

  static propTypes = {
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
    match: PropTypes.object,
    getGroupInfo: PropTypes.func.isRequired,
    addBlackList: PropTypes.func.isRequired,
    removeBlackList: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    blockedUntil: PropTypes.string,
  }

  onSecondsChange(e) {
    e.preventDefault()
    this.setState({
      seconds: e.target.value,
    })
  }

  onAddBlackList() {
    const { groupName }  = this.props.match.params
    this.props.addBlackList({groupName, seconds: this.state.seconds})
  }

  onRemoveBlackList() {
    const { groupName }  = this.props.match.params
    this.props.removeBlackList({groupName})
  }

  componentWillMount() {
    const { groupName }  = this.props.match.params
    this.props.getGroupInfo({ groupName })
  }

  render() {
    const GroupProfileWithLoading = WithLoading(GroupProfile)
    const{ blockedUntil } = this.props
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        <GroupProfileWithLoading {...this.props} />
        {blockedUntil && <p>
          解封时间: {blockedUntil}&nbsp;
          <Button color='info' onClick={this.onRemoveBlackList}>解封</Button>
        </p>}
        <Label for='blacklist'>封禁(秒): </Label>
        <Input
          type='number'
          name='seconds'
          onChange={this.onSecondsChange}
          value={this.state.seconds}
        />
        <Button color='danger' onClick={this.onAddBlackList}>封禁</Button>
      </div>
    )
  }
}
export default GroupDetailsPage