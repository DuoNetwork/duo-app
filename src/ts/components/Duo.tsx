import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as CST from 'ts/common/constants';
import { beethovenWappers } from 'ts/common/wrappers';
import BeethovenAdmin from 'ts/containers/BeethovenAdminCointainer';
import Beethoven from 'ts/containers/BeethovenContainer';
import Magi from 'ts/containers/MagiContainer';
import Status from 'ts/containers/StatusContainer';
import Home from './Pages/Home';

export default class Duo extends React.Component {
	public render() {
		const beethovenTenors = Object.keys(beethovenWappers);
		return (
			<div>
				<Switch>
					{beethovenTenors.map((tenor) => <Route key={tenor} path={`/beethoven/${tenor.toLowerCase()}/admin`} render={() => <BeethovenAdmin tenor={tenor} />} />)}
					{beethovenTenors.map((tenor) => <Route key={tenor} path={`/beethoven/${tenor.toLowerCase()}`} render={() => <Beethoven tenor={tenor} />} />)}
					<Route
						path={'/beethoven/admin'}
						render={() => <BeethovenAdmin tenor={CST.TENOR_PPT} />}
					/>
					<Route
						path={'/beethoven/perpetual'}
						render={() => <Beethoven tenor={CST.TENOR_PPT} />}
					/>
					<Route
						path={'/beethoven'}
						render={() => <Beethoven tenor={CST.TENOR_PPT} />}
					/>
					<Route path={'/magi'} render={() => <Magi />} />
					<Route path={'/status'} render={() => <Status />} />
					<Route render={() => <Home />} />
				</Switch>
			</div>
		);
	}
}
