// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FileDrop from './FileDrop';

export default class Home extends Component {
  static propTypes = {
    setFile: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      videoFile: {},
      subtitlesFile: {}
    };
  }

  processFile() {
    // Put files into Redux store
    // Process vids & display spinner
    // On completion, redirect to clip editing page
    // console.log({videoFile: this.state.videoFile, subtitlesFile: this.state.subtitlesFile});
    this.props.setFiles([this.state.videoFile, this.state.subtitlesFile]);
  }

  setFile(file, type) {
    const newState = {};
    newState[type] = file;
    this.setState(newState);
    // if type === videoFile, get the available subtitle files
  }

  render() {
    const { videoFile, subtitlesFile } = this.state;
    return (
      <div className='container'>

        <div className='row' >
          <div className='col-xs-12'>
            <h1>Upload Your Files</h1>
          </div>
          <div className='col-sm-4'>
            <FileDrop message='Drop your video file here' setFile={this.setFile.bind(this)} type='videoFile' />
          </div>
          <div className='col-sm-4'>
            <FileDrop message='Drop your subtitle file here (if you have one)' setFile={this.setFile.bind(this)} type='subtitlesFile' />
          </div>
          <div className='col-sm-4'>
            <a onClick={this.processFile.bind(this)} ><i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
            <br /><span className='h1'>Go</span>
            </a>
          </div>
          <div className='col-xs-12'>
          </div>
        </div>
      </div>
    );
  }
}
