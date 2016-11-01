// @flow
import React, { Component, PropTypes } from 'react';

class Edit extends Component {
  static propTypes = {
  };

  render() {
    const { media } = this.props;
    return (
      <div>
       <h1>Edit Page</h1>
        <ul>
         {Object.keys(media).map(index => (<li key={index}>{media[index].text}</li>))}
        </ul>
      </div>
    );
  }
}

export default Edit;
