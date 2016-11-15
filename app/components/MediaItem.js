import React, { Component, PropTypes } from 'react';
import { updateMediaTimes } from '../utils/media_utils';

export default class MediaItem extends Component {
  static propTypes = {
    mediaItem: PropTypes.object.isRequired,
    updateMedia: PropTypes.func.isRequired
  };

  constructor(props) {
    super();
    this.state = {
      checked: false
    };
  }

  toggleCheckbox(event) {
    // Can't call event.preventDefault() with a checkbox because prevents checkbox from being updated
    // event.preventDefault();
    this.setState({
      checked: !this.state.checked
    });
  }

  componentWillReceiveProps() {
    console.log('Receiving Props')
  }

  addTimeEnd() {
    const { mediaItem, updateMedia } = this.props;
    const updatedMedia = updateMediaTimes(mediaItem, 'add', 'end', 200);
    updateMedia(updatedMedia);
  }

  render() {
    const { duration, index, media, text } = this.props.mediaItem;
    const { checked } = this.state;

    return (
      <div className='col-xs-12' key={index}>
        <div className='col-sm-1'>
          <label>
            <input type='checkbox' checked={this.state.checked} onClick={this.toggleCheckbox.bind(this)} />
          </label>
        </div>
        <div className='col-sm-11'>
          <br />
          <audio src={`../pkg/${media}?duration=${duration}`} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
          <a onClick={this.addTimeEnd.bind(this)}>+++</a>
          <br />
          <p className='time'>
            {duration}
          </p>
          <p className='text'>
            {text}
          </p>
        </div>
      </div>
    );
  }
}