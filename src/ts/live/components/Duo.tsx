import * as React from 'react';

interface IProps {
	state: string;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { state } = this.props;
		return <div>{state}</div>;
	}
}
