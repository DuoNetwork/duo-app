import * as React from 'react';
import {ICustodianStates} from '../common/types';

interface IProps {
	custodianStates: ICustodianStates;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { custodianStates } = this.props;
		return <div>{JSON.stringify(custodianStates, null, 4)}</div>;
	}
}
