import React, { Component, PropTypes } from 'react'

class Toolbar extends Component {

  render() {
    return (
      <ul className='subtitle-tools'>
        <li>
          Start Time<br />
          <a>+</a>&nbsp;<a>-</a>
        </li>
        <li>
          Shift Backward<br />
          <a>⇐</a>
        </li>
        <li>
          Shift Forward<br />
          <a>⇒</a>
        </li>
        <li>
          End Time<br />
          <a>+</a>&nbsp;<a>-</a>
        </li>
      </ul>
    )
  }
}

export default Toolbar
