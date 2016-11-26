// @flow
import React, { Component, PropTypes } from 'react'

class BulkEditMenu extends Component {
  static propTypes = {
    media: PropTypes.object.isRequired
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
        Bulk Edit Menu
      </div>
    )
  }
}

export default BulkEditMenu
