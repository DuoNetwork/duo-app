//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
import img from '../../../../images/ud.png';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import CardTitleDropdown from '../Common/CardTitleDropdown';
import { SCard } from './_styled';

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
}

interface IState {
	keys: string[];
}

export default class PriceChartCard extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			keys: []
		};
	}

	private handlePickSource = (key: string) => {
		const { keys } = this.state;
		const index = keys.indexOf(key);
		if (index >= 0)
			this.setState({ keys: [...keys.slice(0, index), ...keys.slice(index + 1)] });
		else this.setState({ keys: [...keys, key] });
	};

	public render() {
		const { keys } = this.state;
		return (
			<SCard
				title={
					<CardTitleDropdown
						name="TIME SERIES"
						keys={keys}
						handlePickSource={this.handlePickSource}
					/>
				}
				width="760px"
				margin="0 10px 0 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<div
						style={{
							width: '100%',
							height: 350,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 10,
							border: '1px dashed rgba(255,255,255,.1)'
						}}
					>
						<div
							style={{
								color: 'rgba(255,255,255,.7)',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<img
								src={img}
								style={{ width: 100, height: 100, marginBottom: 20, opacity: 0.9 }}
							/>
							<span> Graph Under Development </span>
						</div>
					</div>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
