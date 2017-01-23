// @flow
import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'

class BulkEditMenu extends Component {
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

  multipleSelected() {
    const { media } = this.props
    return Object.keys(media).filter(key => media[key].selected).length > 1
  }

  render() {
    if (!this.multipleSelected()) {
      return false
    }

    return (
      <ul className='subtitle-tools'>
        <li>
          Start Time<br />
          <a onClick={ ()=>{this.bulkEdit('add', 'start', 200)} }>+</a>
          &nbsp;
          <a onClick={ ()=>{this.bulkEdit('subtract', 'start', 200)} }>-</a>
        </li>
        <li>
          Shift Backward<br />
          <a>⇐</a>
        </li>
        <li>
          Shift Forward<br />
          <a>⇒</a>
        </li>
        <li>
          End Time<br />
          <a onClick={ ()=>{this.bulkEdit('add', 'end', 200)} }>+</a>
          &nbsp;
          <a onClick={ ()=>{this.bulkEdit('subtract', 'end', 200)} }>-</a>
        </li>
      </ul>
    )
  }
}

export default BulkEditMenu
