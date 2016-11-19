// @flow
import React, { Component, PropTypes } from 'react';
import MediaItem from './MediaItem';

class Edit extends Component {
  static propTypes = {
    combineSubtitles: PropTypes.func.isRequired,
    createApkg: PropTypes.func.isRequired,
    filter: PropTypes.string,
    media: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired
  };

  filteredMediaItems() {
    const { combineSubtitles, filter, media } = this.props
    return Object.keys(media).map(key => media[key]).filter(item => {
      console.log({item})
      if (item.text) return item.text.toLowerCase().includes(filter.toLowerCase());
      return {}
    })
      .map(item => <MediaItem combineSubtitles={combineSubtitles} key={item.index} mediaItem={item} updateMedia={this.props.updateMedia} />)
  }

  componentWillUpdate() {
    console.log('Edit component will update')
  }

  componentWillReceiveProps() {
    console.log('Edit component will receive props')
  }

  onFilterChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.props.updateFilter(value);
  }

  render() {
    const { filter, media } = this.props;
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
        <div className='row'>
         {this.filteredMediaItems()}
        </div>
      </div>
    );
  }
}

export default Edit;
