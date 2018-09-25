import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Duo from '../components/Duo';

function mapStateToProps() {
	return {};
}

export default withRouter(connect(
	mapStateToProps,
	{}
)(Duo) as any);
