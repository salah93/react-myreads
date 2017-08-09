import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBar from './SearchBar'


class SearchPage extends React.Component {
  constructor() {
    super()
    this.updateValue = this.updateValue.bind(this)
    this.state = {
      value: '',
      searchBooks: [],
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value.trim() !== this.state.value
  }

  componentDidUpdate(prevProps, prevState) {
    const value = this.state.value.trim()
    var searchBooks = []
    if (value !== '') {
      BooksAPI.search(value).then((result) => {
        if (Object.prototype.toString.call(result) === '[object Array]')
          searchBooks = result
        this.setState({
          searchBooks
        })
      })
    }
    else {
      this.setState({
        searchBooks
      })
    }
  }

  updateValue(val) {
    const value = val.trim()
    this.setState({
      value
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
        <SearchBar value={ this.state.value } updateValue={ this.updateValue }/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid updateBook={this.props.updateLibrary} books={this.state.searchBooks}/>
        </div>
      </div>
    )  
  }
}


export default SearchPage
