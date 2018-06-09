import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button, Label, Input} from 'reactstrap'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'src/styles/DatePicker.css'

@observer
class QuestionGroupSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: props.groupName,
      releaseTime: props.releaseTime,
    }
    this.onDateChange = this.onDateChange.bind(this)
    this.onGroupNameChange = this.onGroupNameChange.bind(this)
    this.onSubmitQuestionGroupChange = this.onSubmitQuestionGroupChange.bind(this)
  }

  static propTypes = {
    groupType: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    releaseTime: PropTypes.object,
    updateQuestionGroup: PropTypes.func.isRequired,
  }

  onDateChange(date) {
    this.setState({
      releaseTime: date,
    })
  }

  onGroupNameChange(e) {
    e.preventDefault()
    this.setState({
      groupName: e.target.value,
    })
  }

  onSubmitQuestionGroupChange() {
    this.props.updateQuestionGroup({
      groupType: this.props.groupType,
      groupName: this.state.groupName,
      releaseTime: this.state.releaseTime,
    })
  }

  render() {
    return(
      <div>
        <Label for='questionGroupName'>问题组名:</Label>
        <Input
          type='text'
          name='questionGroupName'
          onChange={this.onGroupNameChange}
          value={this.state.groupName}
        />
        <Label for='questionReleaseTime'>发布时间:</Label>
        <DatePicker
          selected={this.state.releaseTime}
          onChange={this.onDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />
        <Button onClick={this.onSubmitQuestionGroupChange}>修改</Button>
      </div>
    )
  }
}

export default QuestionGroupSettings