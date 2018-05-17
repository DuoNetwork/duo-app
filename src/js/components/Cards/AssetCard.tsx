import * as d3 from 'd3';
import * as React from 'react';
import { IAssets, IPriceData } from '../../types';

interface IProps {
	assets: IAssets;
	price: IPriceData;
}

const Asset = (props: {name: string, value: number}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between'
		}}
	>
		<div className="tag-unit-3">{props.name}</div>
		<div className="tag-price-3">{d3.formatPrefix(',.2', 1)(props.value)}</div>
	</div>
);

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { assets, price } = this.props;
		const mv =
			assets.ETH * price.ETH + assets.ClassA * price.ClassA + assets.ClassB * price.ClassB;
		return (
			<div className="asset-tag-wrapper">
				<div className="asset-tag-name">
					<span>Assets</span>
				</div>
				<div className="asset-tag">
					<div className="asset-tag-title">
						<h3>Market Value</h3>
					</div>
					<div className="asset-tag-content">
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div className="tag-price mv-usd">{d3.formatPrefix(',.2', 1)(mv)}</div>
							<div className="tag-unit">USD</div>
						</div>
					</div>
				</div>
				<div className="asset-tag">
					<div className="asset-tag-title">
						<h3>Holdings</h3>
					</div>
					<div className="asset-tag-content">
						<Asset name='ETH' value={assets.ETH} />
						<Asset name='Class A' value={assets.ClassA} />
						<Asset name='Class B' value={assets.ClassB} />
					</div>
				</div>
			</div>
		);
	}
}
