import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'


@observer
class QuestionSettingsButton extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    questionNumber: PropTypes.string.isRequired,
    onRedirectToQuestionSettings: PropTypes.func.isRequired,
    isMeta: PropTypes.bool.isRequired,
  }


  render() {
    const { questionNumber, onRedirectToQuestionSettings, isMeta } = this.props
    return(
      <ListGroupItem
        onClick={onRedirectToQuestionSettings}
        action>
        {isMeta? `${questionNumber}(Meta)` : questionNumber}
      </ListGroupItem>
    )
  }
}

export default QuestionSettingsButton