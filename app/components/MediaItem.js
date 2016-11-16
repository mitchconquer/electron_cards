import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../utils/item_types';
import { DragSource, DropTarget } from 'react-dnd';
import { updateMediaTimes } from '../utils/media_utils';

// React DnD Items
const subtitleSource = {
  beginDrag(props) {
    return {
      subtitleId: props.mediaItem.index
    };
  }
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const subtitleTarget = {
  drop(props, monitor) {
    logResult(props.mediaItem, monitor.getItem());
  }
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

// React Component

@DragSource(ItemTypes.SUBTITLE, subtitleSource, sourceCollect)
@DropTarget(ItemTypes.SUBTITLE, subtitleTarget, targetCollect)
export default class MediaItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
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

  addTimeEnd() {
    const { mediaItem, updateMedia } = this.props;
    const updatedMedia = updateMediaTimes(mediaItem, 'add', 'end', 200);
    updateMedia(updatedMedia);
  }

  render() {
    const { duration, index, media, text } = this.props.mediaItem;
    const { connectDragSource, isDragging, connectDropTarget, isOver } = this.props;
    const { checked } = this.state;

    let backgroundColor;
    if (isDragging) {
      backgroundColor = 'navy';
    } else if (isOver) {
      backgroundColor = 'gray';
    } else {
      backgroundColor = 'transparent';
    }

    return connectDropTarget(connectDragSource(
      <div className='col-xs-12' key={index} style={{
            opacity: isDragging ? 0.5 : 1,
            backgroundColor
          }}>
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
          <p className='time' style={{
            opacity: isDragging ? 0.5 : 1
          }}>
            {duration}
          </p>
          <p className='text' style={{
            opacity: isDragging ? 0.5 : 1
          }}>
            {text}
          </p>
        </div>
      </div>
    ));
}
}