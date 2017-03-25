import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'
import BulkEditMenu from './BulkEditMenu'
import classnames from 'classnames'

import '../styles/edit-menu.scss'

class EditMenu extends Component {
  constructor() {
    super()
    this.selectAll = this.selectAll.bind(this)
    this.selectNone = this.selectNone.bind(this)
  }
  selectAll() {
    this.props.selectMedia('ALL')
  }

  selectNone() {
    this.props.selectMedia('NONE')
  }

  render() {
    return (
      <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                  <div className='navbar-header'>
                    <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                      <span className='sr-only'>Toggle navigation</span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                    </button>
                  </div>

                  <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                    <ul className='nav navbar-nav'>
                      <li><a href='#'>Undo</a></li>
                      <li><a href='#'>Redo</a></li>
                    </ul>
                    <form className='navbar-form navbar-left'>
                      <div className='form-group'>
                        <input type='text' className='form-control filter-input' value={this.props.filter} onChange={this.props.onFilterChange} placeholder='Filter' />
                      </div>
                    </form>
                    <ul className='nav navbar-nav navbar-left'>
                      <li><a onClick={this.selectAll}>Select All</a></li>
                      <li><a onClick={this.selectNone}>Select None</a></li>
                      <li className='vertical-spacer'></li>
                      <li><BulkEditMenu media={this.props.media} bulkEditMedia={this.props.bulkEditMedia} /></li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                      <li><a href='#'>Create Anki Deck!</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
    )
  }
}

EditMenu.propTypes = {
  bulkEditMedia: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  selectMedia: PropTypes.func.isRequired,
}

export default EditMenu