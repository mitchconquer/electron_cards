// @flow
import React, { Component, PropTypes } from 'react';

class Edit extends Component {
  static propTypes = {
    createApkg: PropTypes.func.isRequired,
    filter: PropTypes.string,
    media: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired
  };

  filterMedia() {
    const { media, filter } = this.props;
    return Object.keys(media).filter(key => {
      return media[key].text.toLowerCase().includes(filter.toLowerCase());
    });
  }

  onFilterChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.props.updateFilter(value);
  }

  renderMediaItem(item) {
    return (
      <li key={item.index}>
        {item.text}
      </li>
    );
  }

  render() {
    const { filter, media } = this.props;
    console.log({filter});
    return (
      <div>
       <h1>Edit Page</h1>
        <a onClick={this.props.createApkg.bind(this)}>
          <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
          <span className='h1'>Create Anki Deck</span>
        </a>
        <br />
        <br />
        <input type='text' value={filter} onChange={this.onFilterChange.bind(this)} className='filter-input' />
        <br />
        <br />
        <ul>
         {this.filterMedia().map(index => this.renderMediaItem(media[index]))}
        </ul>
      </div>
    );
  }
}

export default Edit;
