import * as d3 from 'd3';
import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import { IPriceData } from '../../common/types';
const format = d3.timeFormat('%Y %b %d');

interface IProps {
	price: IPriceData;
}

const PriceInfo = (props: {
	icon: string;
	name: string;
	prices: Array<{ value: string; unit: string }>;
	classNamePostfix?: string;
}) => {
	const { icon, name, prices } = props;
	const classNamePostfix = props.classNamePostfix || '';
	return (
		<div className="price-tag">
			<div className="bg-logo">
				<img src={icon} />
			</div>
			<div className="tag-title">
				<h3>{name}</h3>
			</div>
			<div className="tag-content">
				<div>
					{prices.map(p => (
						<div key={p.unit} style={{ display: 'flex', flexDirection: 'row' }}>
							<div className={'tag-price' + classNamePostfix + ' ' + p.unit}>
								{p.value}
							</div>
							<div className={'tag-unit' + classNamePostfix}>{p.unit}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default class PriceCard extends React.PureComponent<IProps> {
	public render() {
		const { price } = this.props;
		return (
			<div className="price-tag-wrapper">
				<div className="price-tag-date">
					<span>{'Date  ' + format(new Date(price.Date))}</span>
				</div>
				<PriceInfo
					icon={ethIcon}
					name="ETH"
					prices={[
						{
							value: d3.formatPrefix(',.2', 1)(price.ETH),
							unit: 'USD'
						}
					]}
				/>
				<PriceInfo
					icon={classAIcon}
					name="Class A"
					prices={[
						{
							value: d3.formatPrefix(',.4', 1)(price.ClassA),
							unit: 'USD'
						},
						{
							value: d3.formatPrefix(',.6', 1)(price.ClassA / price.ETH),
							unit: 'ETH'
						}
					]}
					classNamePostfix="-1"
				/>
				<PriceInfo
					icon={classBIcon}
					name="Class B"
					prices={[
						{
							value: d3.formatPrefix(',.4', 1)(price.ClassB),
							unit: 'USD'
						},
						{
							value: d3.formatPrefix(',.6', 1)(price.ClassB / price.ETH),
							unit: 'ETH'
						}
					]}
					classNamePostfix="-2"
				/>
			</div>
		);
	}
}
