// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/Edit';
import { createApkg } from '../actions/media';

function mapStateToProps(state) {
  return {
    media: state.media
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createApkg: () => createApkg()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
