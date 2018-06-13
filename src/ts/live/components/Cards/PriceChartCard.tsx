//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
import img from '../../../../images/ud.png';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import CardTitleSelect from '../Common/CardTitleSelect';
import { SCard } from './_styled';

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
}

export default class InfoCard extends React.PureComponent<IProps> {
	public render() {
		return (
			<SCard
				title={<CardTitleSelect name="FIXING" onSelect={value => alert(value)} />}
				width="630px"
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
