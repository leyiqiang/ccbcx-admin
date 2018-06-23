import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'


@observer
class QuestionProgressButton extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    questionNumber: PropTypes.string.isRequired,
    onRedirectToQuestionProgress: PropTypes.func.isRequired,
  }


  render() {
    const { questionNumber, onRedirectToQuestionProgress } = this.props
    return(
      <ListGroupItem
        onClick={onRedirectToQuestionProgress}
        action>
        {questionNumber}
      </ListGroupItem>
    )
  }
}

export default QuestionProgressButton