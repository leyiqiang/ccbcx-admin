
import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import _ from 'lodash'
import { Input, Button } from 'reactstrap'


@inject(stores => {
  const { newsStore, loadingStore } = stores
  const { isNewsListLoading } = loadingStore
  const { getNews, addNews, successMessage, errorMessage, newsList } = newsStore
  return {
    successMessage,
    errorMessage,
    getNews,
    addNews,
    newsList,
    isNewsListLoading,
  }
})
@observer
class NewsPage extends Component {
  constructor(props) {
    super(props)
    this.renderNewsList = this.renderNewsList.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
    this.onAddNews = this.onAddNews.bind(this)
    this.state = {
      message: '',
    }
  }

  static propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    getNews: PropTypes.func.isRequired,
    addNews: PropTypes.func.isRequired,
    isNewsListLoading: PropTypes.bool.isRequired,
    newsList: MobxPropTypes.observableArray,
  }

  componentWillMount() {
    this.props.getNews()
  }

  onMessageChange(e) {
    e.preventDefault()
    this.setState({
      message: e.target.value,
    })
  }

  onAddNews() {
    this.props.addNews({message: this.state.message})
  }

  renderNewsList() {
    const {
      newsList,
      isNewsListLoading,
    } = this.props
    const newsListView = _.map(newsList, (n) => {
      return (
        <div>
          <p>{n.message}</p>
          <br/>
        </div>
      )
    })
    if (isNewsListLoading) {
      return <h3>Loading...</h3>
    }

    return <div>{newsListView}</div>
  }


  render() {
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          value={this.state.message}
          onChange={this.onMessageChange}
        />
        <Button
          onClick={this.onAddNews}
          color='danger'>
          Add
        </Button>
        {this.renderNewsList}
      </div>
    )
  }
}

export default NewsPage