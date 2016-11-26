// @flow
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FileDrop from './FileDrop'
import Loader from './Loader'
import { extractSubsFile } from '../utils/media_utils'

export default class Home extends Component {
  static propTypes = {
    listEmbeddedSubs: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
    processFiles: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired
  }

  constructor() {
    super()
    this.state = {
      videoFile: {},
      subtitlesFile: {}
    }
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

  // afteryou set the embedded subs
  // if you cilck one, extract the subtitle file and 
  // set that to the state of the subtitleFile in Home component

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
            <FileDrop listEmbeddedSubs={this.props.listEmbeddedSubs} message='Drop your video file here' setFile={this.setFile.bind(this)} selectedFile={videoFile.name} type='videoFile' />
          </div>
          <div className='col-sm-4'>
            <FileDrop listEmbeddedSubs={this.props.listEmbeddedSubs} message='Drop your subtitle file here (if you have one)' setFile={this.setFile.bind(this)} selectedFile={subtitlesFile.name} type='subtitlesFile' />
          </div>
          <div className='col-sm-4'>
            <a onClick={this.processFile.bind(this)} ><i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
            <br /><span className='h1'>Go</span>
            </a>
          </div>
          <div className='col-xs-12'>
            {this.props.processing && 'Processing...'}
          </div>
          <div className='col-xs-12'>
            <ul>
              {this.props.embeddedSubs.map(sub => (
                <li key={sub.index}>
                  <a onClick={ () => this.onExtractSubsFile(sub.index, sub.language) }>
                    {sub.language}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-xs-12'>
            <Loader active={this.props.processing}/>
          </div>
        </div>
      </div>
    );
  }
}
