import React from 'react'
import BookItem from './Book'


class BooksGrid extends React.Component {
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
