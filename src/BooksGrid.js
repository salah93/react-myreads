import React from 'react'
import BookItem from './Book'

class BooksGrid extends React.Component {
  render() {
    const books = this.props.books || []
    return (
      <ol className="books-grid">
        { books.map((b) => (
          <BookItem cover={b.imageLinks.thumbnail} title={b.title} authors={b.authors} />
        )) } 
      </ol>
    )}
}

export default BooksGrid
