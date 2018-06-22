import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';

@inject(stores => {
  const { dataStore, loadingStore } = stores
  // const { isAuthLoading } = loadingStore
  const {
    redirectToGroupData,
    redirectToQuestionData,
    redirectToChart,
    successMessage,
    errorMessage,

  } = dataStore
  return {
    redirectToGroupData,
    redirectToQuestionData,
    redirectToChart,
    successMessage,
    errorMessage,
  }
})
@observer
class DataHomePage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    redirectToGroupData: PropTypes.func.isRequired,
    redirectToQuestionData: PropTypes.func.isRequired,
    redirectToChart: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }


  render() {
    const {
      redirectToGroupData,
      redirectToQuestionData,
      redirectToChart,
    } = this.props
    return (
      <div>
        <Button onClick={redirectToGroupData} color='link'>Sort by Group</Button>
        <Button onClick={redirectToQuestionData} color='link'>Sort by Question</Button>
        <Button onClick={redirectToChart} color='link'>Table and Charts</Button>
      </div>
    )
  }
}

export default DataHomePage