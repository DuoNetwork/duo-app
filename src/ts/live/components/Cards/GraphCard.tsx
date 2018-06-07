//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled'
import { SCard, SCardTitle,  } from './_styled';

interface IProps {
	prices: ICustodianPrices;
	states: ICustodianStates;
	refresh: number;
	balances: IBalances;
}

interface IState {
	time: string;
}

export default class InfoCard extends React.PureComponent<IProps, IState> {
	public render() {
		return (
			<SDivFlexCenter center horizontal marginBottom='20px;'>
				<SCard title={<SCardTitle>GRAPH1</SCardTitle>} width="630px" margin='0 10px 0 0'>
					<SDivFlexCenter horizontal padding='0 10px'>
						<div style={{color: 'white', height: 400}}>1234</div>
					</SDivFlexCenter>
				</SCard>
				<SCard title={<SCardTitle>GRAPH2</SCardTitle>} width="630px"  margin='0 0 0 10px'>
					<SDivFlexCenter horizontal padding='0 10px'>
						<div style={{color: 'white', height: 400}}>1234</div>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
