import React from 'react'

class SearchBar extends React.Component {
  render() {
    return (
      <input type="text" value={this.props.value} onChange={(event) => this.props.updateValue(event.target.value)} placeholder="Search by title or author"/>
    )
  }

}

export default SearchBar
