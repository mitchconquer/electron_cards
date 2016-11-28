import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../utils/item_types';
import { DragSource, DropTarget } from 'react-dnd';
import { updateMediaTimes } from '../utils/media_utils';

// React DnD Items
const subtitleSource = {
  beginDrag(props) {
    return {
      subtitleIndex: props.mediaItem.index
    };
  }
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


// Limit so can only drag onto adjacent subtitles

const subtitleTarget = {
  drop(props, monitor) {
    props.combineSubtitles(props.mediaItem.index, monitor.getItem().subtitleIndex);
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
    combineSubtitles: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    mediaItem: PropTypes.object.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      editingText: false
    }
  }

  addTimeEnd() {
    const { mediaItem, updateMedia } = this.props;
    const updatedMedia = updateMediaTimes(mediaItem, 'add', 'end', 200);
    updateMedia(updatedMedia);
  }

  onToggleCheckbox() {
    const { mediaItem, toggleCheckbox } = this.props
    toggleCheckbox(mediaItem.index)
  }

  onUpdateText(event) {
    const { updateText, mediaItem } = this.props
    updateText(event.target.value, mediaItem.index)
  }

  renderText() {
    if (this.state.editingText) {
      return (
        <input type='text' 
               value={this.props.mediaItem.text} 
               onBlur={this.toggleEditText.bind(this)}
               ref={input => input && input.focus()}
               onChange={this.onUpdateText.bind(this)}
               />
      )
    }
    return (<div onClick={this.toggleEditText.bind(this)}>{this.props.mediaItem.text}</div>)
  }

  toggleEditText() {
    this.setState({
      editingText: !this.state.editingText
    })
  }

  render() {
    const { selected, duration, index, media, text } = this.props.mediaItem;
    const { connectDragSource, isDragging, connectDropTarget, isOver } = this.props;

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
            <input type='checkbox' checked={selected} onClick={this.onToggleCheckbox.bind(this)} />
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
            {this.renderText()}
            <br />
            {media}
          </p>
        </div>
      </div>
    ));
}
}