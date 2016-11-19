// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Edit from '../components/Edit';
import { combineSubtitles, createApkg, updateFilter, updateMediaTimes } from '../actions/media';

function mapStateToProps(state) {
  return {
    filter: state.media.filter,
    media: state.media.allMedia
  };
}

function mapDispatchToProps(dispatch) {
  return {
    combineSubtitles: (subtitle1, subtitle2) => dispatch(combineSubtitles(subtitle1, subtitle2)),
    createApkg: () => dispatch(createApkg()),
    updateFilter: newFilter => dispatch(updateFilter(newFilter)),
    updateMedia: newMedia => dispatch(updateMediaTimes(newMedia))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
