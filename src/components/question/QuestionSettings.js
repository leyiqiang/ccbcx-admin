
import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import {Button, Label, Input} from 'reactstrap'
import _ from 'lodash'
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  CodeBlockButton,
} from 'draft-js-buttons'


const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    CodeBlockButton,
  ],
})
const { Toolbar } = toolbarPlugin
const plugins = [toolbarPlugin]

@observer
class QuestionSettings extends Component {
  constructor(props) {
    super(props)
    let editorContent
    // convert from mobx object into JS object
    const questionContentToJs = toJS(props.questionContent)
    if (_.isNil(props.questionContent)) {
      editorContent = EditorState.createEmpty()
    } else {
      editorContent = EditorState.createWithContent(convertFromRaw(questionContentToJs))
    }
    this.state = {
      answer: props.answer,
      questionContent: editorContent,
    }
    this.onSubmitQuestionChange = this.onSubmitQuestionChange.bind(this)
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onQuestionContentChange = this.onQuestionContentChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    questionContent: PropTypes.object,
    updateQuestion: PropTypes.func.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
  }

  onQuestionContentChange(editorState) {
    this.setState({
      questionContent: editorState,
    })
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onQuestionContentChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  onQuestionAnswerChange(e) {
    e.preventDefault()
    this.setState({
      answer: e.target.value,
    })
  }

  onSubmitQuestionChange() {
    const currentContent = this.state.questionContent.getCurrentContent()
    this.props.updateQuestion({
      questionNumber: this.props.questionNumber,
      answer: this.state.answer,
      questionContent: convertToRaw(currentContent),
    })
  }

  onCancel() {
    this.props.redirectToQuestionList()
  }

  render() {
    return(
      <div>
        <Label for='questionGroupName'>题目内容:</Label>
        <div className='border'>
          <Editor
            editorState={this.state.questionContent}
            onChange={this.onQuestionContentChange}
            handleKeyCommand={this.handleKeyCommand}
            plugins={plugins}
          />
          <Toolbar/>
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