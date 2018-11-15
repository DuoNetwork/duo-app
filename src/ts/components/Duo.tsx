import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as CST from 'ts/common/constants';
import BeethovenAdmin from 'ts/containers/BeethovenAdminCointainer';
import Beethoven from 'ts/containers/BeethovenContainer';
import Magi from 'ts/containers/MagiContainer';
import Status from 'ts/containers/StatusContainer';
import Home from './Home';

export default class Duo extends React.Component {
	public render() {
		return (
			<div>
				<Switch>
					<Route
						path={'/beethoven/m19/admin'}
						render={() => <BeethovenAdmin tenor={CST.TH_6M} />}
					/>
					<Route path={'/beethoven/m19'} render={() => <Beethoven tenor={CST.TH_6M} />} />
					<Route
						path={'/beethoven/perpetual/admin'}
						render={() => <BeethovenAdmin tenor={CST.TH_PERPETUAL} />}
					/>
					<Route
						path={'/beethoven/perpetual'}
						render={() => <Beethoven tenor={CST.TH_PERPETUAL} />}
					/>
					<Route
						path={'/beethoven'}
						render={() => <Beethoven tenor={CST.TH_PERPETUAL} />}
					/>
					<Route path={'/magi'} render={() => <Magi />} />
					<Route path={'/status'} render={() => <Status />} />
					<Route render={() => <Home />} />
				</Switch>
			</div>
		);
	}
}
