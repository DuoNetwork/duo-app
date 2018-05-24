import calculator from '../common/calculator';
import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import { IAssets, IRawData } from '../common/types';
const rawData: IRawData[] = require('../../static/ETH.json');

const [e, a, b, r] = calculator.getAllTimeSeriesFromEth(rawData);

export const initialState: reduxTypes.IUIState = {
	eth: e,
	classA: a,
	classB: b,
	reset: r,
	history: [],
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
	resetPrice: e[0].value,
	beta: 1,
	day: 0,
	upward: 0,
	downward: 0,
	periodic: 0,
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
		mv
	} = state;
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, initialState, {
				[CST.AC_SETTING]: state.setting,
				eth: state.eth,
				classA: state.classA,
				classB: state.classB,
				reset: state.reset
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
				[CST.AC_HISTORY]: [...state.history, (action as reduxTypes.ITradeAction).history],
				[CST.AC_ASSETS]: (action as reduxTypes.ITradeAction).assets
			});
		case CST.AC_NEXT:
			const newDayCount = day + 1;
			if (newDayCount >= eth.length) return state;
			const newEthPx = eth[newDayCount].value;
			const newNavA = classA[newDayCount + upward + downward + periodic].value;
			const newNavB = classB[newDayCount + upward + downward].value;

			let newAssets: IAssets;
			let newBeta = beta;
			let newResetPrice = resetPrice;
			let msg = '';
			let newUpwardCount = upward;
			let newDownwardCount = downward;
			let newPeriodicCount = periodic;
			if (newNavB >= state.setting.upwardResetLimit) {
				newAssets = {
					ETH:
						assets.ETH +
						((newNavA - 1) * assets.ClassA + (newNavB - 1) * assets.ClassB) / newEthPx,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB
				};
				newBeta = 1;
				newResetPrice = newEthPx;
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (upward) triggered.</div>";
				newUpwardCount++;
			} else if (newNavB <= state.setting.downwardResetLimit) {
				newAssets = {
					ETH: assets.ETH + (newNavA - newNavB) * assets.ClassA / newEthPx,
					ClassA: assets.ClassA * newNavB,
					ClassB: assets.ClassB * newNavB
				};
				newBeta = 1;
				newResetPrice = newEthPx;
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (downward) triggered.</div>";
				newDownwardCount++;
			} else if (newNavA >= state.setting.periodicResetLimit) {
				newAssets = {
					ETH: assets.ETH + (newNavA - 1) * assets.ClassA / newEthPx,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB
				};
				newBeta = calculator.updateBeta(beta, newEthPx, resetPrice, newNavA, 1);
				newResetPrice = newEthPx;
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (periodic) triggered.</div>";
				newPeriodicCount++;
			} else newAssets = assets;

			return Object.assign(
				{},
				state,
				{
					[CST.AC_MV]: [
						...mv,
						{
							datetime: eth[newDayCount].datetime,
							value:
								assets.ETH * newEthPx +
								assets.ClassA * newNavA +
								assets.ClassB * newNavB
						}
					],
					[CST.AC_ASSETS]: newAssets,
					[CST.AC_RESET_PRICE]: newResetPrice,
					[CST.AC_BETA]: newBeta,
					[CST.AC_DAY]: newDayCount,
					[CST.AC_UPWARD]: newUpwardCount,
					[CST.AC_DOWNWARD]: newDownwardCount,
					[CST.AC_PERIODIC]: newPeriodicCount,
					[CST.AC_PRICE]: {
						Date: eth[newDayCount].datetime,
						ETH: newEthPx,
						ClassA:
							classA[
								newDayCount + newUpwardCount + newDownwardCount + newPeriodicCount
							].value,
						ClassB: classB[newDayCount + newUpwardCount + newDownwardCount].value
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
