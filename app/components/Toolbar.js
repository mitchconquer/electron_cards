import { updateMediaTimes } from '../utils/media_utils';
import React, { Component, PropTypes } from 'react'

class Toolbar extends Component {


  static propTypes = {
    updateMedia: PropTypes.func.isRequired,
    mediaItem: PropTypes.object.isRequired
  }

  adjustTime(action, position) {
    const { mediaItem, updateMedia } = this.props;
    const updatedMedia = updateMediaTimes(mediaItem, action, position, 200);
    updateMedia(updatedMedia);
  }

  shiftForward() {
    const { mediaItem, updateMedia } = this.props;
    const extendEnd = updateMediaTimes(mediaItem, 'add', 'end', 200);
    const shiftedMedia = updateMediaTimes(extendEnd, 'subtract', 'start', 200);
    updateMedia(shiftedMedia);
  }

  shiftBackward() {
    const { mediaItem, updateMedia } = this.props;
    const subtractEnd = updateMediaTimes(mediaItem, 'subtract', 'end', 200);
    const shiftedMedia = updateMediaTimes(subtractEnd, 'add', 'start', 200);
    updateMedia(shiftedMedia);
  }

  render() {
    return (
      <ul className='subtitle-tools'>
        <li>
          Start Time<br />
          <a onClick={this.adjustTime.bind(this, 'add', 'start')}>+</a>
          &nbsp;
          <a onClick={this.adjustTime.bind(this, 'subtract', 'start')}>-</a>
        </li>
        <li>
          Shift Backward<br />
          <a onClick={this.shiftBackward.bind(this)}>⇐</a>
        </li>
        <li>
          Shift Forward<br />
          <a onClick={this.shiftForward.bind(this)}>⇒</a>
        </li>
        <li>
          End Time<br />
          <a onClick={this.adjustTime.bind(this, 'add', 'end')}>+</a>
          &nbsp;
          <a onClick={this.adjustTime.bind(this, 'subtract', 'end')}>-</a>
        </li>
      </ul>
    )
  }
}

export default Toolbar
