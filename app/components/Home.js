// @flow
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FileDrop from './FileDrop'
import Loader from './Loader'
import EmbeddedSubs from './embedded-subs'
import { extractSubsFile } from '../utils/media_utils'
import classnames from 'classnames'

require('../styles/home.scss')

export default class Home extends Component {
  static propTypes = {
    listEmbeddedSubs: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
    processFiles: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    embeddedSubs: PropTypes.array,
  }

  constructor() {
    super()
    this.state = {
      videoFile: {},
      subtitlesFile: {}
    }

    this.onExtractSubsFile = this.onExtractSubsFile.bind(this)
  }

  onExtractSubsFile(index, language) {
    const { subtitlesFile, videoFile } = this.state;
    if (videoFile) {
      extractSubsFile(index, videoFile.path)
        .then(
          extractedFile => {
            const extractedSubs = {
              ...extractedFile,
              name: `${extractedFile.name} - ${language}`
            }
            this.setState({subtitlesFile: extractedSubs})
          }
        )
    }
  }

  processFile() {
    const { videoFile, subtitlesFile } = this.state
    if (videoFile && subtitlesFile) {
      this.props.processFiles(videoFile, subtitlesFile)
    }
  }

  setFile(file, type) {
    const newState = {}
    newState[type] = file
    this.setState(newState)
    // if type === videoFile, get the available subtitle files
  }

  readyToGo() {
    const haveVideo = Object.keys(this.state.videoFile).length > 0
    const haveSubs = Object.keys(this.state.subtitlesFile).length > 0
    return haveVideo && haveSubs
  }

  // afteryou set the embedded subs
  // if you cilck one, extract the subtitle file and 
  // set that to the state of the subtitleFile in Home component

  render() {
    // Decent loading animation https://codepen.io/Haasbroek/pen/gbqYyj
    
    const { videoFile, subtitlesFile } = this.state;
    return (
      <div className='container' onDragOver={event=>event.preventDefault()} onDrop={event=>event.preventDefault()}>

        <div className='row' >
          <div className='col-xs-12'>
            <h1>App Name Placeholder</h1>
          </div>
          <div className='col-xs-12'>
          </div>
          <div className='col-sm-5'>
            <h3>1. Choose a video file</h3>
            <FileDrop listEmbeddedSubs={this.props.listEmbeddedSubs} message='Drop your video file here' setFile={this.setFile.bind(this)} selectedFile={videoFile.name} type='videoFile' />
          </div>
          <div className='col-sm-5'>
            <h3>2. Choose a subtitles file</h3>
            <FileDrop listEmbeddedSubs={this.props.listEmbeddedSubs} message='Drop your subtitle file here (if you have one)' setFile={this.setFile.bind(this)} selectedFile={subtitlesFile.name} type='subtitlesFile' />
          </div>
          <div className='col-xs-12'>
            {this.props.processing && 'Processing...'}
          </div>
          <div className='col-xs-5'>
            <EmbeddedSubs subs={this.props.embeddedSubs} extractSubs={this.onExtractSubsFile}/>
          </div>
          <div className='col-xs-12'>
            <Loader active={this.props.processing}/>
          </div>
        </div>
        <nav className={classnames('navbar navbar-default navbar-fixed-bottom go-bar', {'go-bar-valid': this.readyToGo()})}>
          <div className='container'>
            <div className='col-sm-4 col-sm-offset-2 go-button'>
              <a onClick={this.processFile.bind(this)} ><span className='h1'>3. Go</span>&nbsp;<i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
