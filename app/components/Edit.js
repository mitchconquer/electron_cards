// @flow
import React, { Component, PropTypes } from 'react';

class Edit extends Component {
  static propTypes = {
    createApkg: PropTypes.func.isRequired
  };

  renderMediaItem(item) {
    return (
      <li key={item.index}>
        {item.text}
      </li>
    );
  }

  render() {
    const { media } = this.props;
    return (
      <div>
       <h1>Edit Page</h1>
        <a onClick={this.props.createApkg.bind(this)}>
          <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:'50px'}}></i>
          <span className='h1'>Create Anki Deck</span>
        </a>
        <br />
        <br />
        <ul>
         {Object.keys(media).map(index => this.renderMediaItem(media[index]))}
        </ul>
      </div>
    );
  }
}

export default Edit;
