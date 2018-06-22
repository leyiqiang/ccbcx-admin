import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'

// @inject(stores => {
//   const { dataStore, loadingStore } = stores
//   // const { isAuthLoading } = loadingStore
//   const {
//     redirectToGroupData,
//     redirectToQuestionData,
//     redirectToChart,
//     successMessage,
//     errorMessage,
//
//   } = dataStore
//   return {
//     redirectToGroupData,
//     redirectToQuestionData,
//     redirectToChart,
//     successMessage,
//     errorMessage,
//   }
// })
@observer
class DataChartPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
  }


  render() {
    // const {} = this.props
    return (
      <div>
          chart
      </div>
    )
  }
}

export default DataChartPage