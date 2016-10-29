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
      videoFile: {name: 'test'},
      subtitlesFile: {}
    };
  }

  setFile(file, type) {
    console.log('setFile called')
    const newState = {};
    newState[type] = file;
    this.setState(newState, ()=>{
      console.log({videoFile: this.state.videoFile, newState, file, type})
    });
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
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <br />Go
          </div>
          <div className='col-xs-12'>
            {this.state.videoFile.name}<br />
            {this.state.videoFile.path}<br />
          </div>
        </div>
      </div>
    );
  }
}
