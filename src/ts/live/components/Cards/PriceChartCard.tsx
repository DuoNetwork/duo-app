//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
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
					<div style={{ color: 'white', height: 400 }}>1234</div>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
