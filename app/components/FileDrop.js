// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Dropzone from 'react-dropzone';


export default class FileDrop extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    setFile: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      file: {}
    };
  }

  onDrop(files) {
    const fileBlob = files[0];
    const newFile = {};
    _fileProperties.forEach(key => {
      newFile[key] = fileBlob[key];
    });
    newFile.basicType = this.props.type;
    this.setState({file: newFile});
    this.props.setFile(newFile, this.props.type);
  }

  render() {
    return (
      <div>
        <Dropzone onDropAccepted={this.onDrop.bind(this)} multiple={false} disablePreview={false}>
          <div>{this.props.message}</div><br />
          <div className='text-success'>{this.state.file.name}</div>
        </Dropzone>
      </div>
    );
  }
}

const _fileProperties = [
  'lastModified',
  'lastModifiedDate',
  'name',
  'path',
  'preview',
  'size',
  'type',
  'webkitRelativePath'
];
