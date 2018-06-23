import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import _ from 'lodash'
import {Button} from 'reactstrap'

@inject(stores => {
  const { dataQuestionStore, loadingStore } = stores
  const { isDataQuestionLoading } = loadingStore
  const {
    redirectToHome,
    successMessage,
    errorMessage,
    getProgressListByQuestionNumber,
    progressList,
  } = dataQuestionStore
  return {
    redirectToHome,
    successMessage,
    getProgressListByQuestionNumber,
    errorMessage,
    progressList,
    isDataQuestionLoading,
  }
})
@observer
class ProgressQuestionPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { questionNumber }  = this.props.match.params
    this.props.getProgressListByQuestionNumber({questionNumber})
  }

  static propTypes = {
    redirectToHome: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    isDataQuestionLoading: PropTypes.bool.isRequired,
    progressList: MobxPropTypes.observableArray,
    getProgressListByQuestionNumber: PropTypes.func.isRequired,
    match: PropTypes.object,
  }


  render() {
    const { progressList, redirectToHome } = this.props
    const { questionNumber }  = this.props.match.params
    const tdStyle = {wordWrap: 'break-word', whiteSpace: 'normal' }
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        <h3>题目: {questionNumber}</h3>
        <Button onClick={redirectToHome} color='info'>返回</Button>
        <BootstrapTable
          data={progressList}
          search
        >
          <TableHeaderColumn
            dataField='groupName'
            isKey
            dataSort
            tdStyle={tdStyle}
          >队名</TableHeaderColumn>
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

export default ProgressQuestionPage