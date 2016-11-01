// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FileDrop from './FileDrop';
import mediaFlashcards from 'videocards';

export default class Home extends Component {
  static propTypes = {
    setFiles: PropTypes.func.isRequired,
    processFiles: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      videoFile: {},
      subtitlesFile: {}
    };
  }

  processFile() {
    const { videoFile, subtitlesFile } = this.state;
    this.props.processFiles(videoFile, subtitlesFile);
  }

  setFile(file, type) {
    const newState = {};
    newState[type] = file;
    this.setState(newState);
    // if type === videoFile, get the available subtitle files
  }

  render() {
    // Decent loading animation https://codepen.io/Haasbroek/pen/gbqYyj
    
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
            {this.props.processing && 'Processing...'}
          </div>
        </div>
      </div>
    );
  }
}
