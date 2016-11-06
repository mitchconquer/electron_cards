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
    const { index, text } = this.props.mediaItem;
    const { checked } = this.state;
    return (
      <li key={index}>
        <label>
          <input type='checkbox' checked={this.state.checked} onClick={this.toggleCheckbox.bind(this)} />
          {text}
        </label>
      </li>
    );
  }
}