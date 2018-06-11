//import moment from 'moment';
import { Radio } from 'antd';
import * as React from 'react';
import successIcon from '../../../../images/stauts/success.svg';
import warningIcon from '../../../../images/stauts/warning.svg';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardExtraDivSolid, SCardList, SCardRadioExtraDiv, SCardTitle, SRadioGroup } from './_styled';

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

interface IStatusList {
	state: string;
	totalSupplyA: number;
	totalSupplyB: number;
	alpha: number;
	beta: number;
	periodCoupon: number;
	limitPeriodic: number;
	limitUpper: number;
	limitLower: number;
	commissionRate: number;
	ethDuoFeeRatio: number;
}

const StatusList = (props: {
	statusList: IStatusList
}) => {
	const statusList = props.statusList;
	return<div>{JSON.stringify(statusList)}</div>
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
		const { states } = this.props;
		const statusList: IStatusList = {
		state: states.state,
		totalSupplyA: states.totalSupplyA,
		totalSupplyB: states.totalSupplyB,
		alpha: states.alpha,
		beta: states.beta,
		periodCoupon: states.periodCoupon,
		limitPeriodic: states.limitPeriodic,
		limitUpper: states.limitUpper,
		limitLower: states.limitLower,
		commissionRate: states.commissionRate,
		ethDuoFeeRatio: states.ethDuoFeeRatio
		};
		return (
			<SDivFlexCenter center horizontal>
				<SCard
					title={<SCardTitle>CUSTODIAN STATUS</SCardTitle>}
					width="470px"
					margin="0 10px 0 0"
					extra={
						<SCardExtraDivSolid>
							<div>{statusList.state}</div>
							<img src={statusList.state === 'Trading' ? successIcon : warningIcon}/>
						</SCardExtraDivSolid>
					}
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<SCardList>
							<StatusList statusList={statusList}/>
						</SCardList>
					</SDivFlexCenter>
				</SCard>
				<SCard
					title={<SCardTitle>TRANSACTION</SCardTitle>}
					extra={<RadioExtraDiv />}
					width="790px"
					margin="0 0 0 10px"
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<div style={{ color: 'white', height: 400 }}>1234</div>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
