import { connect } from 'react-redux';
import HikeForm from './hike_form';
import { createHike } from '../../actions/hike_actions';

const mapStateToProps = ({ session }) => ({
    userZipcode: session.currentUser ? session.currentUser.zipcode : "{\"lat\":47.6288591,\"lng\":-122.34569190000002}"
});

const mapDispatchToProps = dispatch => ({
  createHike: (hike) => dispatch(createHike(hike))
});

export default connect(mapStateToProps, mapDispatchToProps)(HikeForm);
