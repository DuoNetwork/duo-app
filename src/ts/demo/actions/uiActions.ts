import * as CST from '../common/constants';
//import * as reduxTypes from '../common/reduxTypes';
import { IAssets } from '../common/types';

export function refresh() {
	return {
		type: CST.AC_REFRESH
	};
}

export function messsage(type: string, content: string, visible: boolean) {
	return {
		type: CST.AC_MESSAGE,
		value: { type, content, visible }
	};
}

export function form(type: string, visible: boolean) {
	return {
		type: CST.AC_FORM,
		value: { type, visible }
	};
}

export function next() {
	return {
		type: CST.AC_NEXT
	};
}

export function forward() {
	return {
		type: CST.AC_FWD
	};
}

export function trade(tradeString: string, assets: IAssets) {
	return {
		type: CST.AC_TRADE,
		trade: tradeString,
		assets
	};
}

export function setting(
	couponRate: number,
	upwardResetLimit: number,
	downwardResetLimit: number,
	periodicResetLimit: number
) {
	return {
		type: CST.AC_SETTING,
		value: { couponRate, upwardResetLimit, downwardResetLimit, periodicResetLimit }
	};
}
