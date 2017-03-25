// @flow
import React, { Component, PropTypes } from 'react'
import MediaItem from './MediaItem'
import BulkEditMenu from './BulkEditMenu'
import EditMenu from './edit-menu'
require('../styles/edit.scss')

class Edit extends Component {
  static propTypes = {
    bulkEditMedia: PropTypes.func.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    combineSubtitles: PropTypes.func.isRequired,
    createApkg: PropTypes.func.isRequired,
    filter: PropTypes.string,
    media: PropTypes.object.isRequired,
    onRedo: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    removeMedia: PropTypes.func.isRequired,
    selectNone: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired
  };

  filteredMediaItems() {
    const { combineSubtitles, filter, media, toggleCheckbox, updateText, removeMedia } = this.props
    return Object.keys(media).map(key => media[key]).filter(item => item.text.toLowerCase().includes(filter.toLowerCase()))
      .map(item => <MediaItem
        combineSubtitles={combineSubtitles}
        key={item.index}
        mediaItem={item}
        updateMedia={this.props.updateMedia}
        toggleCheckbox={toggleCheckbox}
        updateText={updateText}
        removeMedia={removeMedia}
      />)
  }

  onFilterChange(event) {
    event.preventDefault()
    const value = event.target.value
    this.props.updateFilter(value)
  }

  render() {
    const { bulkEditMedia, canRedo, canUndo, filter, media, onRedo, onUndo, selectAll, selectNone } = this.props

    return (
      <div>
        <h1>Edit Page</h1>
        <EditMenu />
        <div className="col-xs-6">
          {canUndo && <button onClick={onUndo} className="btn btn-default">Undo</button>}
          {canRedo && <button onClick={onRedo} className="btn btn-default">Redo</button>}
        </div>
        <a onClick={this.props.createApkg.bind(this)}>
          <i className="fa fa-arrow-right" aria-hidden="true" style={{ fontSize: '50px' }} />
          <span className="h1">Create Anki Deck</span>
        </a>
        <br />
        <br />
        <input type="text" value={filter} onChange={this.onFilterChange.bind(this)} className="filter-input" />
        <br />
        <br />
        <BulkEditMenu media={media} bulkEditMedia={bulkEditMedia} />
        <a onClick={selectAll}>Select All</a> | <a onClick={selectNone}>Select None</a>
        <br />
        <br />
        <div className="row">
          {this.filteredMediaItems()}
        </div>
      </div>
    )
  }
}

export default Edit
