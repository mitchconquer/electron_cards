// @flow
import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'
import classnames from 'classnames'

class BulkEditMenu extends Component {
  constructor() {
    super()
    this.shiftForward = this.shiftForward.bind(this)
    this.shiftBackward = this.shiftBackward.bind(this)
  }

  static propTypes = {
    bulkEditMedia: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired
  }

  bulkEdit(action, position, msecs) {
    const { bulkEditMedia, media } = this.props
    const updatedMedia = {}
    Object.keys(media)
      .filter(key => media[key].selected)
      .forEach(key => {
        updatedMedia[key] = {
          ...updateMediaTimes(media[key], action, position, msecs, true)
        }
      })
    bulkEditMedia(updatedMedia)
  }

  shiftForward() {
    const { media, bulkEditMedia } = this.props
    const shiftedMedia = Object.values(media)
      .filter(mediaItem => mediaItem.selected)
      .map(mediaItem => updateMediaTimes(mediaItem, 'add', 'end', 200))
      .reduce((mediaItems, mediaItem) => ({
        ...mediaItems,
        [mediaItem.index]: updateMediaTimes(mediaItem, 'subtract', 'start', 200)
      }), {})
    bulkEditMedia(shiftedMedia)
  }

  shiftBackward() {
    const { media, bulkEditMedia } = this.props
    const shiftedMedia = Object.values(media)
      .filter(mediaItem => mediaItem.selected)
      .map(mediaItem => updateMediaTimes(mediaItem, 'subtract', 'end', 200))
      .reduce((mediaItems, mediaItem) => ({
        ...mediaItems,
        [mediaItem.index]: updateMediaTimes(mediaItem, 'add', 'start', 200)
      }), {})
    bulkEditMedia(shiftedMedia)
  }

  multipleSelected() {
    const { media } = this.props
    return Object.keys(media).filter(key => media[key].selected).length > 1
  }

  render() {
    return (
      <ul className={classnames('subtitle-tools', { 'dont-show': !this.multipleSelected() })}>
        <li>
          Start Time<br />
          <a onClick={this.bulkEdit.bind(this, 'add', 'start', 200)}>+</a>
          &nbsp;
          <a onClick={this.bulkEdit.bind(this, 'subtract', 'start', 200)}>-</a>
        </li>
        <li>
          Shift Backward<br />
          <a onClick={this.shiftBackward}>⇐</a>
        </li>
        <li>
          Shift Forward<br />
          <a onClick={this.shiftForward}>⇒</a>
        </li>
        <li>
          End Time<br />
          <a onClick={this.bulkEdit.bind(this, 'add', 'end', 200)}>+</a>
          &nbsp;
          <a onClick={this.bulkEdit.bind(this, 'subtract', 'end', 200)}>-</a>
        </li>
      </ul>
    )
  }
}

export default BulkEditMenu
