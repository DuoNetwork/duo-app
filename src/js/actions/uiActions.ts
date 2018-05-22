import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import { IAssets } from '../common/types';

export function refresh(): reduxTypes.IBaseAction {
	return {
		type: CST.AC_REFRESH
	};
}

export function addHistory(tx: string): reduxTypes.IStringAction {
	return {
		type: CST.AC_HISTORY,
		value: tx
	};
}

export function messsage(
	type: string,
	content: string,
	visible: boolean
): reduxTypes.IObjectAction {
	return {
		type: CST.AC_MESSAGE,
		value: { type, content, visible }
	};
}

export function form(type: string, visible: boolean): reduxTypes.IObjectAction {
	return {
		type: CST.AC_FORM,
		value: { type, visible }
	};
}

export function updateAssets(assets: IAssets): reduxTypes.IObjectAction {
	return {
		type: CST.AC_ASSETS,
		value: assets
	};
}

export function next(): reduxTypes.IBaseAction {
	return {
		type: CST.AC_NEXT
	};
}

export function trade(amount: number, isA: boolean): reduxTypes.ITradeAction {
	return {
		type: CST.AC_TRADE,
		value: amount,
		isA: isA
	};
}
