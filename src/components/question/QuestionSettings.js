
import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button, Label, Input} from 'reactstrap'
import _ from 'lodash'
import { EditorState, ContentState} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import 'draft-js/dist/Draft.css'

import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
const toolbarPlugin = createToolbarPlugin()
// import 'node_modules/draft-js-static-toolbar-plugin/lib/plugin.css'




@observer
class QuestionSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: props.answer,
      questionContent: EditorState.createWithContent(
        ContentState.createFromText(this.props.questionContent)),
    }
    this.onSubmitQuestionChange = this.onSubmitQuestionChange.bind(this)
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onQuestionContentChange = this.onQuestionContentChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    questionContent: PropTypes.string,
    updateQuestion: PropTypes.func.isRequired,
    redirectToQuestionList: PropTypes.func.isRequired,
  }

  onQuestionContentChange(editorState) {
    this.setState({
      questionContent: editorState,
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
        <Label for='questionGroupName'>question content:</Label>
        <Editor
          editorState={this.state.questionContent}
          onChange={this.onQuestionContentChange}
          plugins={[toolbarPlugin]}
        />
        <Label for='questionReleaseTime'>Answer:</Label>
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