//import moment from 'moment';
import { Radio } from 'antd';
import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardRadioExtraDiv, SCardTitle, SRadioGroup } from './_styled';

const RadioButton = Radio.Button;
interface IProps {
	prices: ICustodianPrices;
	states: ICustodianStates;
	refresh: number;
	balances: IBalances;
}

interface IState {
	time: string;
}

const RadioExtraDiv = () => {
	return (
		<SCardRadioExtraDiv>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Fee Payment Method</div>
				<SRadioGroup defaultValue="a" size="small">
					<RadioButton value="a">ETH</RadioButton>
					<RadioButton value="b">DUO</RadioButton>
				</SRadioGroup>
			</div>
		</SCardRadioExtraDiv>
	);
};

export default class InfoCard extends React.PureComponent<IProps, IState> {
	public render() {
		return (
			<SDivFlexCenter center horizontal>
				<SCard
					title={<SCardTitle>TRANSACTION</SCardTitle>}
					width="1280px"
					extra={<RadioExtraDiv />}
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<div style={{ color: 'white', height: 300 }}>1234</div>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
