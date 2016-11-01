// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/Edit';

function mapStateToProps(state) {
  return {
    media: state.media
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
