import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { Button } from 'reactstrap'

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
    const {progressList, redirectToHome} = this.props
    const tdStyle = {wordWrap: 'break-word', whiteSpace: 'normal' }
    return (
      <div>
        <Button onClick={redirectToHome} color='info'>返回</Button>
        <BootstrapTable
          data={progressList}
          search
          exportCSV
        >
          <TableHeaderColumn
            dataField='_id'
            isKey
            dataSort
            hidden
            tdStyle={tdStyle}
          >_id</TableHeaderColumn>
          <TableHeaderColumn
            dataField='questionNumber'
            dataSort
            tdStyle={tdStyle}
          >题目号</TableHeaderColumn>
          <TableHeaderColumn
            dataField='completeTime'
            dataSort
            tdStyle={tdStyle}
          >完成时间</TableHeaderColumn>
          <TableHeaderColumn
            dataField='score'
            dataSort
          >得分</TableHeaderColumn>
          <TableHeaderColumn
            dataField='answerHistory'
            dataSort
            tdStyle={tdStyle}
          >回答历史</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default DataChartPage