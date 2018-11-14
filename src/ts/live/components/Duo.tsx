import { Layout } from 'antd';
import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as CST from '../common/constants';
import Beethoven from '../containers/BeethovenContainer';
import Header from '../containers/HeaderContainer';
import Magi from '../containers/MagiContainer';
import Status from '../containers/StatusContainer';
import { SContent, SDivFlexCenter } from './_styled';

export default class Duo extends React.Component {
	public componentDidMount() {
		document.title = 'DUO | Trustless Derivatives';
	}

	public render() {
		return (
			<div>
				<Switch>
					<Route exact path={'/beethoven'} render={() => <Beethoven />} />
					<Route exact path={'/magi'} render={() => <Magi />} />
					<Route exact path={'/status'} render={() => <Status />} />
					<Route
						path={'/'}
						render={() => (
							<Layout>
								<Header />
								<SContent>
									<div>{CST.TH_CUSTODIANS}</div>
									<SDivFlexCenter
										center
										horizontal
										marginBottom="20px;"
										marginTop="20px;"
									>
										<div>
											<Link to={'/' + CST.TH_BEETHOVEN.toLowerCase()}>
												{CST.TH_BEETHOVEN.toUpperCase()}
											</Link>
										</div>
										<div>{CST.TH_MOZART.toUpperCase() + ' Coming Soon'}</div>
										<div>
											{CST.TH_COVERED_OPTIONS.toUpperCase() + ' Coming Soon'}
										</div>
									</SDivFlexCenter>
									<div>{CST.TH_CUSTODIANS}</div>
									<SDivFlexCenter center horizontal marginBottom="20px;">
										<div>
											<Link to={'/' + CST.TH_MAGI.toLowerCase()}>
												{CST.TH_MAGI.toUpperCase()}
											</Link>
										</div>
									</SDivFlexCenter>
								</SContent>
							</Layout>
						)}
					/>
				</Switch>
			</div>
		);
	}
}
