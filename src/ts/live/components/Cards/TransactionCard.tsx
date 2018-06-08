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
			<SCard title={<SCardTitle>TRANSACTION</SCardTitle>} width="1280px">
				<SDivFlexCenter horizontal padding='0 10px'>
					<div style={{color: 'white', height: 400}}>1234</div>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
