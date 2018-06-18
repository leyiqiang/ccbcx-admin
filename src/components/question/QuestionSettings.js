import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
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
      hint1: this.props.hint1,
      hint2: this.props.hint2,
      hint3: this.props.hint3,
    }
    this.onSubmitQuestionChange = this.onSubmitQuestionChange.bind(this)
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onQuestionContentChange = this.onQuestionContentChange.bind(this)
    this.onHint1Change = this.onHint1Change.bind(this)
    this.onHint2Change = this.onHint2Change.bind(this)
    this.onHint3Change = this.onHint3Change.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string,
    answer: PropTypes.string,
    questionContent: PropTypes.string,
    updateQuestion: PropTypes.func.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
    hint1: PropTypes.string,
    hint2: PropTypes.string,
    hint3: PropTypes.string,
  }

  onQuestionContentChange(value) {
    this.setState({
      questionContent: value,
    })
  }

  onHint1Change(e) {
    e.preventDefault()
    this.setState({
      hint1: e.target.value,
    })
  }

  onHint2Change(e) {
    e.preventDefault()
    this.setState({
      hint2: e.target.value,
    })
  }

  onHint3Change(e) {
    e.preventDefault()
    this.setState({
      hint3: e.target.value,
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
      hint1: this.state.hint1,
      hint2: this.state.hint2,
      hint3: this.state.hint3,
    })
  }


  onCancel() {
    this.props.redirectToQuestionList()
  }

  render() {
    const { questionNumber } = this.props
    return(
      <div>
        <h3>题号: {questionNumber}</h3>
        <hr/>
        <Label for='questionGroupName'>题目内容:</Label>
        <div className='border' onClick={this.focus}>
          <ReactQuill
            value={this.state.questionContent}
            modules={modules}
            formats={formats}
            onChange={this.onQuestionContentChange} />
        </div>
        <Label for='questionAnswer'>答案:</Label>
        <Input
          type='text'
          name='questionAnswer'
          onChange={this.onQuestionAnswerChange}
          value={this.state.answer}
        />
        <Label for='hint1'>提示1:</Label>
        <Input
          type='text'
          name='hint1'
          onChange={this.onHint1Change}
          value={this.state.hint1}
        />
        <Label for='hint2'>提示2:</Label>
        <Input
          type='text'
          name='hint2'
          onChange={this.onHint2Change}
          value={this.state.hint2}
        />
        <Label for='hin3'>提示3:</Label>
        <Input
          type='text'
          name='hint3'
          onChange={this.onHint3Change}
          value={this.state.hint3}
        />
        <Button onClick={this.onSubmitQuestionChange}>修改</Button>
        <Button color='danger' onClick={this.onCancel}>取消</Button>
      </div>
    )
  }
}

export default QuestionSettings