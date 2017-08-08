import React from 'react'
import BookItem from './Book'
import * as BooksAPI from './BooksAPI'

class BooksGrid extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const nextBooks = nextProps.books
    const nextBooksLength = nextBooks.length
    const thisBooks = this.props.books
    const thisBooksLength = thisBooks.length
    if (nextBooksLength !== thisBooksLength)
      return true
    for (let i = 0; i < nextBooksLength; i++){
      if (nextBooks[i].id !== thisBooks[i].id || nextBooks[i].shelf !== thisBooks[i].shelf) 
        return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    const books = this.props.books || []
    if (this.props.library && books.length > prevProps.books.length) {
      let added_book = books.filter(x => prevProps.books.indexOf(x) === -1)[0];
      BooksAPI.update(added_book, added_book.shelf)
    }
  }

  render() {
    const books = this.props.books || []
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.shelf }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((b) => (
              <BookItem key={ b.id } updateBook={this.props.updateBook} book={ b } />
        )) }
          </ol>
        </div>
      </div>
    )}
}

export default BooksGrid
