import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import {Button, Label, Input} from 'reactstrap'
import _ from 'lodash'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}


const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
]

@observer
class QuestionSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: this.props.answer,
      questionContent: this.props.questionContent,
    }
    this.onSubmitQuestionChange = this.onSubmitQuestionChange.bind(this)
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onQuestionContentChange = this.onQuestionContentChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string,
    answer: PropTypes.string,
    questionContent: PropTypes.string,
    updateQuestion: PropTypes.func.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
  }

  onQuestionContentChange(value) {
    console.log(value)
    this.setState({
      questionContent: value,
    })
  }


  onQuestionAnswerChange(e) {
    e.preventDefault()
    this.setState({
      answer: e.target.value,
    })
  }

  onSubmitQuestionChange() {
    this.props.updateQuestion({
      questionNumber: this.props.questionNumber,
      answer: this.state.answer,
      questionContent: this.state.questionContent,
    })
  }

  onCancel() {
    this.props.redirectToQuestionList()
  }

  render() {
    return(
      <div>
        <Label for='questionGroupName'>题目内容:</Label>
        <div className='border' onClick={this.focus}>
          <ReactQuill
            value={this.state.questionContent}
            modules={modules}
            formats={formats}
            onChange={this.onQuestionContentChange} />
        </div>
        <Label for='questionReleaseTime'>答案:</Label>
        <Input
          type='text'
          name='questionAnswer'
          onChange={this.onQuestionAnswerChange}
          value={this.state.answer}
        />
        <Button onClick={this.onSubmitQuestionChange}>修改</Button>
        <Button color='danger' onClick={this.onCancel}>Cancel</Button>
      </div>
    )
  }
}

export default QuestionSettings