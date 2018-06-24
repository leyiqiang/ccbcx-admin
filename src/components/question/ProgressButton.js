import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'


@observer
class ProgressButton extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    content: PropTypes.string.isRequired,
    onRedirect: PropTypes.func.isRequired,
  }


  render() {
    const { content, onRedirect } = this.props
    return(
      <ListGroupItem
        onClick={onRedirect}
        action>
        {content}
      </ListGroupItem>
    )
  }
}

export default ProgressButton