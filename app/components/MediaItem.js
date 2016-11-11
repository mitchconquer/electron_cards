import React, { Component, PropTypes } from 'react';

export default class MediaItem extends Component {
  static propTypes = {
    mediaItem: PropTypes.object.isRequired
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

  render() {
    const { index, media, text } = this.props.mediaItem;
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
          <audio src={`../pkg/${media}`} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
          <br />
          <p className='text'>
            {text}
          </p>
        </div>
      </div>
    );
  }
}