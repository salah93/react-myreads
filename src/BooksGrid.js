import React from 'react'
import BookItem from './Book'

class BooksGrid extends React.Component {
  render() {
    const books = this.props.books || []
    return (
      <ol className="books-grid">
        { books.map((b) => (
          <BookItem key={ b.id } updateBook={this.props.updateBook} book={ b } />
        )) }
      </ol>
    )}
}

export default BooksGrid
