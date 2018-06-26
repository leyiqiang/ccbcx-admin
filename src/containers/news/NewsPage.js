
import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import _ from 'lodash'
import { Input, Button, Jumbotron } from 'reactstrap'


@inject(stores => {
  const { newsStore, loadingStore } = stores
  const { isNewsListLoading } = loadingStore
  const { getNews, addNews, successMessage, errorMessage, newsList, deleteNews } = newsStore
  return {
    successMessage,
    errorMessage,
    getNews,
    addNews,
    newsList,
    deleteNews,
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
    this.onDeleteNews = this.onDeleteNews.bind(this)
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
    deleteNews: PropTypes.func.isRequired,
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
    this.setState({ message: '' })
  }

  onDeleteNews({_id}) {
    this.props.deleteNews({_id})
  }

  renderNewsList() {
    const {
      newsList,
      isNewsListLoading,
    } = this.props
    const newsListView = _.map(newsList, (n) => {
      return (
        <li key={n._id} className='list-group-item'>
          <h5>{n.createdAt}</h5>
          <p>{n.message}</p>
          <Button color='danger' onClick={() => {this.onDeleteNews({_id: n._id})}}>Delete</Button>
        </li>
      )
    })
    if (isNewsListLoading) {
      return <h3>Loading...</h3>
    }

    return <ul className='list-group'>{newsListView}</ul>
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
          color='info'>
          Add
        </Button>
        {this.renderNewsList()}
      </div>
    )
  }
}

export default NewsPage