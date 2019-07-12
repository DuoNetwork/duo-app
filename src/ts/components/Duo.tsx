import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { dualClassWrappers } from 'ts/common/wrappers';
import DualClassCustodianAdminCointainer from 'ts/containers/Pages/DualClassCustodianAdminCointainer';
import DualClassCustodianContainer from 'ts/containers/Pages/DualClassCustodianContainer';
import Esplanade from 'ts/containers/Pages/EsplanadeCointainer';
import MagiAdmin from 'ts/containers/Pages/MagiAdminContainer';
import Magi from 'ts/containers/Pages/MagiContainer';
import StakingAdmin from 'ts/containers/Pages/StakingAdminContainer';
import Staking from 'ts/containers/Pages/StakingContainer';
import StakingM from 'ts/containers/Pages/StakingMobileContainer';
import Status from 'ts/containers/Pages/StatusContainer';
import Home from './Pages/Home';

export default class Duo extends React.Component {
	public render() {
		const routes: any[] = [];
		for (const type in dualClassWrappers) {
			for (const tenor in dualClassWrappers[type]) {
				routes.push(
					<Route
						key={type + tenor + 'admin'}
						path={`/${type.toLowerCase()}/${tenor.toLowerCase()}/admin`}
						render={() => (
							<DualClassCustodianAdminCointainer type={type} tenor={tenor} />
						)}
					/>
				);
				routes.push(
					<Route
						key={type + tenor}
						path={`/${type.toLowerCase()}/${tenor.toLowerCase()}`}
						render={() => <DualClassCustodianContainer type={type} tenor={tenor} />}
					/>
				);
			}
			routes.push(
				<Route
					key={type + 'admin'}
					path={`/${type.toLowerCase()}/admin`}
					render={() => (
						<DualClassCustodianAdminCointainer
							type={type}
							tenor={WrapperConstants.TENOR_PPT}
						/>
					)}
				/>
			);
			routes.push(
				<Route
					key={type}
					path={`/${type.toLowerCase()}`}
					render={() => (
						<DualClassCustodianContainer
							type={type}
							tenor={WrapperConstants.TENOR_PPT}
						/>
					)}
				/>
			);
		}

		// <Route path={'/magi/admin'} render={() => <MagiAdmin />} />
		// routes.push();

		return (
			<div>
				<Switch>
					{routes}
					<Route key={'magiAdmin'} path={`/magi/admin`} render={() => <MagiAdmin />} />
					<Route path={'/esplanade'} render={() => <Esplanade />} />
					<Route path={'/magi'} render={() => <Magi />} />
					<Route path={'/status'} render={() => <Status />} />
					<Route path={'/staking'} component={(props: any) => <Staking {...props} contractIndex={0}/>}/>
					<Route path={'/stakingterm'} component={(props: any) => <Staking {...props} contractIndex={1}/>}/>
					<Route path={'/stakingadmin'} render={() => <StakingAdmin />} />
					<Route path={'/stakingm'} component={(props: any) => <StakingM {...props} contractIndex={0}/>}/>
					<Route path={'/stakingmterm'} component={(props: any) => <StakingM {...props} contractIndex={1}/>}/>
					<Route render={() => <Home />} />
				</Switch>
			</div>
		);
	}
}
