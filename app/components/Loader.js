// @flow
import React, { Component, PropTypes } from 'react';
// Not working...
// import styles from './Loader.css';

class Edit extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  };

  render() {
    const { active } = this.props;
    
    if (!active) {
      return false;
    }

    return (
      <div className='loader-container'>
       <div className='spinner'>
         <div className='dot1'></div>
         <div className='dot2'></div>
       </div>
      </div>
    );
  }
}

export default Edit;
