import calculator from '../common/calculator';
import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import { IAssets, IRawData } from '../common/types';
const rawData: IRawData[] = require('../../static/ETH.json');

const [e, a, b, rp, bt, up, down, period] = calculator.getAllTimeSeriesFromEth(rawData);

export const initialState: reduxTypes.IUIState = {
	eth: e,
	classA: a,
	classB: b,
	resetPrice: rp,
	beta: bt,
	upward: up,
	downward: down,
	periodic: period,
	trades: [],
	message: {
		type: '',
		content: '',
		visible: false
	},
	setting: {
		couponRate: 0.0002,
		upwardResetLimit: 2,
		downwardResetLimit: 0.25,
		periodicResetLimit: 1.02
	},
	form: {
		type: '',
		visible: false
	},
	mv: [{ datetime: e[0].datetime, value: e[0].value * 100 }],
	assets: {
		ETH: 100,
		ClassA: 0,
		ClassB: 0
	},
	day: 0,
	price: {
		Date: e[0].datetime,
		ETH: e[0].value,
		ClassA: a[0].value,
		ClassB: b[0].value
	}
};

export function uiReducer(
	state: reduxTypes.IUIState = initialState,
	action: reduxTypes.Action
): reduxTypes.IUIState {
	const {
		eth,
		classA,
		classB,
		assets,
		resetPrice,
		beta,
		day,
		upward,
		downward,
		periodic,
		mv,
		setting
	} = state;
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, initialState, {
				setting,
				eth,
				classA,
				classB,
				resetPrice,
				beta,
				upward,
				downward,
				periodic
			});
		case CST.AC_MESSAGE:
			return Object.assign({}, state, {
				[CST.AC_MESSAGE]: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_SETTING:
			const newSetting: any = (action as reduxTypes.IObjectAction).value;
			const [ne, na, nb, nr] = calculator.getAllTimeSeriesFromEth(
				rawData,
				1,
				newSetting.couponRate,
				newSetting.upwardResetLimit,
				newSetting.downwardResetLimit,
				newSetting.periodicResetLimit
			);
			return Object.assign({}, initialState, {
				[CST.AC_SETTING]: newSetting,
				eth: ne,
				classA: na,
				classB: nb,
				reset: nr
			});
		case CST.AC_FORM:
			return Object.assign({}, state, {
				[CST.AC_FORM]: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_TRADE:
			return Object.assign({}, state, {
				trades: [...state.trades, (action as reduxTypes.ITradeAction).trade],
				[CST.AC_ASSETS]: (action as reduxTypes.ITradeAction).assets
			});
		case CST.AC_NEXT:
			const newDayCount = day + 1;
			if (newDayCount >= eth.length) return state;
			const newDatetime = eth[newDayCount].datetime;
			const newEthPx = eth[newDayCount].value;
			let upwardCount = upward.filter(d => d.datetime < newDatetime).length;
			let downwardCount = downward.filter(d => d.datetime < newDatetime).length;
			let periodicCount = periodic.filter(d => d.datetime < newDatetime).length;
			const newNavA = classA[newDayCount + upwardCount + downwardCount + periodicCount].value;
			const newNavB = classB[newDayCount + upwardCount + downwardCount].value;

			let newAssets: IAssets;
			let msg = '';
			if (newNavB >= state.setting.upwardResetLimit) {
				newAssets = calculator.assetUpwardReset(assets, newEthPx, newNavA, newNavB);
				upwardCount++;
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (upward) triggered.</div>";
			} else if (newNavB <= state.setting.downwardResetLimit) {
				newAssets = calculator.assetDownwardReset(assets, newEthPx, newNavA, newNavB);
				downwardCount++
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (downward) triggered.</div>";
			} else if (newNavA >= state.setting.periodicResetLimit) {
				newAssets = calculator.assetPeriodicReset(assets, newEthPx, newNavA);
				periodicCount++
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (periodic) triggered.</div>";
			} else newAssets = assets;

			return Object.assign(
				{},
				state,
				{
					[CST.AC_MV]: [
						...mv,
						{
							datetime: newDatetime,
							value:
								assets.ETH * newEthPx +
								assets.ClassA * newNavA +
								assets.ClassB * newNavB
						}
					],
					[CST.AC_ASSETS]: newAssets,
					[CST.AC_DAY]: newDayCount,
					[CST.AC_PRICE]: {
						Date: newDatetime,
						ETH: newEthPx,
						ClassA:
							classA[
								newDayCount + upwardCount + downwardCount + periodicCount
							].value,
						ClassB: classB[newDayCount + upwardCount + downwardCount].value
					}
				},
				msg
					? {
							[CST.AC_MESSAGE]: {
								type: "<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>",
								content: msg,
								visible: true
							}
					}
					: {}
			);
		default:
			return state;
	}
}
