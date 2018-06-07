import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import { ListGroupItem } from 'reactstrap'
import _ from 'lodash'


@observer
class GroupDetailsButton extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    groupName: PropTypes.string.isRequired,
    onRedirectToGroupDetails: PropTypes.func.isRequired,
  }


  render() {
    const { groupName, onRedirectToGroupDetails } = this.props
    return(
      <ListGroupItem
        onClick={onRedirectToGroupDetails}
        action>
        {groupName}
      </ListGroupItem>
    )
  }
}

export default GroupDetailsButton