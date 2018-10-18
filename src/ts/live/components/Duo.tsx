import * as React from 'react';
import { /*Link, */ Route, Switch } from 'react-router-dom';
import Admin from '../containers/AdminContainer';
import Beethoven from '../containers/BeethovenContainer';
import Status from '../containers/StatusContainer';
import User from '../containers/UserContainer';
// import { SDivFlexCenter } from './_styled';
// import { SCard } from './Cards/_styled';
interface IProps {
	location: object;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const {} = this.props;
		const path: string = (location as any).pathname;
		const parts = path.split('/');
		const base = parts.slice(0, parts.length - 1).join('/') + '/';
		return (
			<div>
				<Switch>
					<Route exact path={`${base}beethoven`} render={() => <Beethoven />} />
					<Route exact path={`${base}status`} render={() => <Status />} />
					<Route exact path={`${base}admin`} render={() => <Admin />} />
					<Route exact path={`${base}user`} render={() => <User />} />
					<Route
						path={base}
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
