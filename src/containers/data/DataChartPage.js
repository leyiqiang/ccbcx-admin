import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

@inject(stores => {
  const { dataChartStore, loadingStore } = stores
  const { isDataChartLoading } = loadingStore
  const {
    progressList,
    getProgressList,
    redirectToHome,
    successMessage,
    errorMessage,
  } = dataChartStore
  return {
    progressList,
    getProgressList,
    redirectToHome,
    isDataChartLoading,
    successMessage,
    errorMessage,
  }
})
@observer
class DataChartPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getProgressList()
  }

  static propTypes = {
    isDataChartLoading: PropTypes.bool.isRequired,
    progressList: MobxPropTypes.observableArray,
    getProgressList: PropTypes.func.isRequired,
    redirectToHome: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }


  render() {
    const {progressList} = this.props
    const tdStyle = {wordWrap: 'break-word', whiteSpace: 'normal' }
    return (
      <div>Todo</div>
    )
  }
}

export default DataChartPage