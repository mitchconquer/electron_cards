// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { setFiles } from '../actions/files';

const mapDispatchToProps = dispatch => ({
  setFiles: files => {console.log('container');return dispatch(setFiles(files));}
});

const mapStateToProps = state => ({
  
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomePageContainer;