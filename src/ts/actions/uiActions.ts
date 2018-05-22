import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import { IAssets } from '../common/types';

export function refresh(): reduxTypes.IBaseAction {
	return {
		type: CST.AC_REFRESH
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

export function next(): reduxTypes.IBaseAction {
	return {
		type: CST.AC_NEXT
	};
}

export function trade(history: string, assets: IAssets): reduxTypes.ITradeAction {
	return {
		type: CST.AC_TRADE,
		history,
		assets
	};
}
