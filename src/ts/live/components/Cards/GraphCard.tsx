//import * as d3 from 'd3';
//import moment from 'moment';
import { Select } from 'antd';
import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled'
import { SCard, SCardTitle, SCardTitleSelector  } from './_styled';

const Option = Select.Option;

interface IProps {
	prices: ICustodianPrices;
	states: ICustodianStates;
	refresh: number;
	balances: IBalances;
}

interface IState {
	time: string;
}

const SCardTitleWithSelector = (props: {
	name: string;
}) => {
	return (
		<SCardTitle>
			<SDivFlexCenter horizontal noJust>
				<div>{props.name}</div>
				<SCardTitleSelector
					defaultValue="smartContract"
					style={{ width: 120, paddingTop: 1.5, marginLeft: 12 }}
					size="small"
				>
					<Option value="smartContract">Smart Contract</Option>
					<Option value="bitfinex">Bitfinex</Option>
					<Option value="kraken">Kraken</Option>
					<Option value="gdax">Gdax</Option>
				</SCardTitleSelector>
			</SDivFlexCenter>
		</SCardTitle>
	);
};

export default class InfoCard extends React.PureComponent<IProps, IState> {
	public render() {
		return (
			<SDivFlexCenter center horizontal marginBottom='20px;'>
				<SCard title={<SCardTitleWithSelector name='GRAPH A'/>} width="630px" margin='0 10px 0 0'>
					<SDivFlexCenter horizontal padding='0 10px'>
						<div style={{color: 'white', height: 400}}>1234</div>
					</SDivFlexCenter>
				</SCard>
				<SCard title={<SCardTitleWithSelector name='GRAPH B'/>} width="630px"  margin='0 0 0 10px'>
					<SDivFlexCenter horizontal padding='0 10px'>
						<div style={{color: 'white', height: 400}}>1234</div>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
