import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Admin from '../containers/AdminContainer';
import Beethoven from '../containers/BeethovenContainer';
import Status from '../containers/StatusContainer';
import User from '../containers/UserContainer';
import { SDivFlexCenter } from './_styled';
import { SCard } from './Cards/_styled';
interface IProps {
	location: object;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const {} = this.props;
		return (
			<div>
				<Switch>
					<Route exact path="/beethoven" render={() => <Beethoven />} />
					<Route exact path="/status" render={() => <Status />} />
					<Route exact path="/admin" render={() => <Admin />} />
					<Route exact path="/user" render={() => <User />} />
					<Route
						render={() => (
							<div>
								<SDivFlexCenter center horizontal marginBottom="20px;">
									<div>
										<Link to={'/beethoven'}>
											<SCard
												title="Beethoven"
												width="640px"
												margin="0 0 0 10px"
											>
												<div style={{ color: 'white' }}> Beethoven </div>
											</SCard>
										</Link>
									</div>
									<div>
										<Link to={'/status'}>
											<SCard
												title="Beethoven"
												width="640px"
												margin="0 0 0 10px"
											>
												<div style={{ color: 'white' }}> Status </div>
											</SCard>
										</Link>
									</div>
								</SDivFlexCenter>
								<SDivFlexCenter center horizontal marginBottom="20px;">
									<div>
										<Link to={'/admin'}>
											<SCard
												title="Beethoven"
												width="640px"
												margin="0 0 0 10px"
											>
												<div style={{ color: 'white' }}> Admin </div>
											</SCard>
										</Link>
									</div>
									<div>
										<Link to={'/user'}>
											<SCard
												title="Beethoven"
												width="640px"
												margin="0 0 0 10px"
											>
												<div style={{ color: 'white' }}> User </div>
											</SCard>
										</Link>
									</div>
								</SDivFlexCenter>
							</div>
						)}
					/>
				</Switch>
			</div>
		);
	}
}
