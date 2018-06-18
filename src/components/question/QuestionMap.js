import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'src/styles/Grid.css'

@observer
class QuestionMap extends Component {
  constructor(props) {
    super(props)
    this.onUpdate = this.onUpdate.bind(this)

  }

  static propTypes = {
    questionList: MobxPropTypes.observableArray,
    location: PropTypes.string,
    isMeta: PropTypes.bool,
    questionNumber: PropTypes.string,
    updateQuestionLocation: PropTypes.func.isRequired,
  }

  onUpdate({x, y}) {
    const { updateQuestionLocation, questionNumber } = this.props
    const location = x + '-' + y
    console.log(x)
    updateQuestionLocation({questionNumber, location})
  }
  render() {
    const {questionList, location} = this.props
    const getQuestionValue = (x, y) => {
      const locationString = x + '-' + y
      const question = _.find(questionList, {location: locationString})
      if (!_.isNil(question)) {
        return question.location === location?
          <strong>{question.questionNumber}</strong> : question.questionNumber
      } else {
        return <span>&nbsp;</span>
      }
    }
    let rowItems = []
    let gridItems = []
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const key = i + '-' + j
        rowItems.push(
          <div onClick={(i, j) => this.onUpdate({x: i, y:j})} key={key} className='square'>
            <div className='grid-content'>
              {getQuestionValue(i, j)}
            </div>
          </div>
        )}
      gridItems.push(rowItems)
      rowItems = []
    }
    const {isMeta} = this.props
    if (!isMeta) {
      return (
        <div>
          {_.map(gridItems, row => _.map(row, (item) => {
            return item
          }))}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default QuestionMap