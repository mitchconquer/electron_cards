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
    const {  } = this.props

    if (!this.multipleSelected()) {
      return false
    }

    return (
      <div>
        <a onClick={ ()=>{this.bulkEdit('add', 'end', 200)} }>Add 200mS to End</a>
      </div>
    )
  }
}

export default BulkEditMenu
