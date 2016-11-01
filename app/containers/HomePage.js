// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { setFiles, processFiles } from '../actions/files';

const mapDispatchToProps = dispatch => ({
  setFiles: files => dispatch(setFiles(files)),
  processFiles: (videoFile, subtitlesFile) => dispatch(processFiles(videoFile, subtitlesFile))
});

const mapStateToProps = state => ({
  processing: state.files.processing
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomePageContainer;