//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
import { IAcceptedPrice } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import CardTitleSelect from '../Common/CardTitleSelect';
import { SCard } from './_styled';

interface IProps {
	price: IAcceptedPrice[];
	reset: IAcceptedPrice[];
}

export default class NavChartCard extends React.PureComponent<IProps> {
	public render() {
		return (
			<SCard
				title={<CardTitleSelect name="NAV" onSelect={value => alert(value)} />}
				width="630px"
				margin="0 0 0 10px"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<div style={{ color: 'white', height: 400 }}>1234</div>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
