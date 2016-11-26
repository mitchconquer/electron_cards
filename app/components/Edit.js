// @flow
import React, { Component, PropTypes } from 'react';
import MediaItem from './MediaItem';

class Edit extends Component {
  static propTypes = {
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    combineSubtitles: PropTypes.func.isRequired,
    createApkg: PropTypes.func.isRequired,
    filter: PropTypes.string,
    media: PropTypes.object.isRequired,
    onRedo: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired
  };

  filteredMediaItems() {
    const { combineSubtitles, filter, media, toggleCheckbox } = this.props
    return Object.keys(media).map(key => media[key]).filter(item => {
      return item.text.toLowerCase().includes(filter.toLowerCase())
    })
      .map(item => <MediaItem combineSubtitles={combineSubtitles} key={item.index} mediaItem={item} updateMedia={this.props.updateMedia} toggleCheckbox={toggleCheckbox} />)
  }

  onFilterChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.props.updateFilter(value);
  }

  render() {
    const { canRedo, canUndo, filter, media, onRedo, onUndo } = this.props;
    return (
      <div>
       <h1>Edit Page</h1>
       <div className='col-xs-6'>
        {canUndo && <button onClick={onUndo} className='btn btn-default'>Undo</button>}
        {canRedo && <button onClick={onRedo} className='btn btn-default'>Redo</button>}
       </div>
        <a onClick={this.props.createApkg.bind(this)}>
          <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
          <span className='h1'>Create Anki Deck</span>
        </a>
        <br />
        <br />
        <input type='text' value={filter} onChange={this.onFilterChange.bind(this)} className='filter-input' />
        <br />
        <br />
        {Object.keys(media).filter(key => media[key].selected).length}
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
