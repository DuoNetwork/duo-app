import * as React from 'react';
import { /*Link, */ Route, Switch } from 'react-router-dom';
// import Admin from '../containers/AdminContainer';
import Beethoven from '../containers/BeethovenContainer';
import Magi from '../containers/MagiContainer';
import Status from '../containers/StatusContainer';
// import User from '../containers/UserContainer';
// import { SDivFlexCenter } from './_styled';
// import { SCard } from './Cards/_styled';

export default class Duo extends React.Component {
	public render() {
		return (
			<div>
				<Switch>
					<Route exact path={'/beethoven'} render={() => <Beethoven />} />
					<Route exact path={'/magi'} render={() => <Magi />} />
					<Route exact path={'/status'} render={() => <Status />} />
					{/* <Route exact path={'/admin'} render={() => <Admin />} /> */}
					{/* <Route exact path={'/user'} render={() => <User />} /> */}
					<Route
						path={'/'}
						render={() => (
							<Beethoven />
							// <div>
							// 	<SDivFlexCenter center horizontal marginBottom="20px;" marginTop="20px;">
							// 		<div>
							// 			<Link to={'/beethoven'}>
							// 				<SCard width="640px" margin="0 10px 0 0">
							// 					<div style={{ color: 'white', marginTop: 10 }}> Beethoven </div>
							// 				</SCard>
							// 			</Link>
							// 		</div>
							// 		<div>
							// 			<Link to={'/status'}>
							// 				<SCard width="640px" margin="0 0 0 10px">
							// 					<div style={{ color: 'white', marginTop: 10 }}> Status </div>
							// 				</SCard>
							// 			</Link>
							// 		</div>
							// 	</SDivFlexCenter>
							// 	<SDivFlexCenter center horizontal marginBottom="20px;">
							// 		<div>
							// 			<Link to={'/admin'}>
							// 				<SCard width="640px" margin="0 10px 0 0">
							// 					<div style={{ color: 'white', marginTop: 10 }}> Admin </div>
							// 				</SCard>
							// 			</Link>
							// 		</div>
							// 		<div>
							// 			<Link to={'/user'}>
							// 				<SCard width="640px" margin="0 0 0 10px">
							// 					<div style={{ color: 'white', marginTop: 10 }}> User </div>
							// 				</SCard>
							// 			</Link>
							// 		</div>
							// 	</SDivFlexCenter>
							// </div>
						)}
					/>
				</Switch>
			</div>
		);
	}
}
