// @flow
import React, { Component, PropTypes } from 'react'
import MediaItem from './MediaItem'
import EditMenu from './edit-menu'
require('../styles/edit.scss')

class Edit extends Component {
  constructor() {
    super()
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange(event) {
    event.preventDefault()
    const value = event.target.value
    this.props.updateFilter(value)
  }

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

  render() {
    const { bulkEditMedia, bulkDeleteMedia, canRedo, canUndo, createApkg, filter, media, onRedo, onUndo, selectMedia } = this.props

    return (
      <div>
        <h1>App Name Placeholder</h1>
        <p>Each item below will be a flashcard in Anki. Preview and edit them below. Click "Create Anki Deck" to export the deck.</p>
        <EditMenu media={media} bulkEditMedia={bulkEditMedia} onFilterChange={this.onFilterChange} filter={filter} selectMedia={selectMedia} canRedo={canRedo} canUndo={canUndo} onRedo={onRedo} onUndo={onUndo} createApkg={createApkg} bulkDeleteMedia={bulkDeleteMedia} />
        <div className='container'>
          <div className='row'>
            {this.filteredMediaItems()}
          </div>
        </div>
      </div>
    )
  }
}

Edit.propTypes = {
  bulkEditMedia: PropTypes.func.isRequired,
  bulkDeleteMedia: PropTypes.func.isRequired,
  canRedo: PropTypes.bool.isRequired,
  canUndo: PropTypes.bool.isRequired,
  combineSubtitles: PropTypes.func.isRequired,
  createApkg: PropTypes.func.isRequired,
  filter: PropTypes.string,
  media: PropTypes.object.isRequired,
  onRedo: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  removeMedia: PropTypes.func.isRequired,
  selectMedia: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  updateMedia: PropTypes.func.isRequired,
  updateText: PropTypes.func.isRequired
}

export default Edit
