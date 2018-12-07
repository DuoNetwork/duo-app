import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as CST from 'ts/common/constants';
import { dualClassWrappers } from 'ts/common/wrappers';
import DualClassCustodianAdminCointainer from 'ts/containers/Pages/DualClassCustodianAdminCointainer';
import DualClassCustodianContainer from 'ts/containers/Pages/DualClassCustodianContainer';
import Magi from 'ts/containers/Pages/MagiContainer';
import Status from 'ts/containers/Pages/StatusContainer';
import Home from './Pages/Home';

export default class Duo extends React.Component {
	public render() {
		const routes: any[] = [];
		for (const type in dualClassWrappers) {
			routes.push(
				<Route
					path={`/${type.toLowerCase()}/admin`}
					render={() => (
						<DualClassCustodianAdminCointainer type={type} tenor={CST.TENOR_PPT} />
					)}
				/>
			);
			routes.push(
				<Route
					path={`/${type.toLowerCase()}`}
					render={() => <DualClassCustodianContainer type={type} tenor={CST.TENOR_PPT} />}
				/>
			);
			for (const tenor in dualClassWrappers[type]) {
				routes.push(
					<Route
						path={`/${type.toLowerCase()}/${tenor.toLowerCase()}/admin`}
						render={() => (
							<DualClassCustodianAdminCointainer type={type} tenor={tenor} />
						)}
					/>
				);
				routes.push(
					<Route
						path={`/${type.toLowerCase()}/${tenor.toLowerCase()}`}
						render={() => <DualClassCustodianContainer type={type} tenor={tenor} />}
					/>
				);
			}
		}

		return (
			<div>
				<Switch>
					{routes}
					<Route path={'/magi'} render={() => <Magi />} />
					<Route path={'/status'} render={() => <Status />} />
					<Route render={() => <Home />} />
				</Switch>
			</div>
		);
	}
}
