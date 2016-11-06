// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/Edit';
import { createApkg, updateFilter } from '../actions/media';

function mapStateToProps(state) {
  return {
    filter: state.media.filter,
    media: state.media.allMedia
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createApkg: () => dispatch(createApkg()),
    updateFilter: newFilter => dispatch(updateFilter(newFilter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
