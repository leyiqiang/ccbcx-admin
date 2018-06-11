import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import WithLoading from 'src/components/WithLoading'
import GroupProfile from 'src/components/group/GroupProfile'

@inject(stores => {
  const { questionStore, loadingStore } = stores
  const {
    errorMessage,
  } = questionStore
  // const { isGroupProfileLoading } = loadingStore
  return {
  }
})
@observer
class QuestionSettingsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    match: PropTypes.object,
  }

  componentWillMount() {
    const { questionNumber }  = this.props.match.params
  }

  render() {
    const { questionNumber }  = this.props.match.params
    // const GroupProfileWithLoading = WithLoading(GroupProfile)
    return (
      <div>{questionNumber}</div>
    )
  }
}
export default QuestionSettingsPage