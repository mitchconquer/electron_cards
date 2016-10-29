// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { setFile } from '../actions/files';

const mapDispatchToProps = dispatch => ({
  setFile: file => dispatch(setFile(file))
});

const mapStateToProps = state => ({
  
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomePageContainer;