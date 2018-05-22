import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import {IAssets, ITimeSeriesData} from '../common/types';

export function refresh(): reduxTypes.Action {
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
): reduxTypes.Action {
	return {
		type: CST.AC_MESSAGE,
		value: { type, content, visible }
	};
}

export function form(type: string, visible: boolean): reduxTypes.Action {
	return {
		type: CST.AC_FORM,
		value: {type, visible}
	}
}

export function addMV(mv: ITimeSeriesData): reduxTypes.Action {
	return {
		type: CST.AC_MV,
		value: mv
	}
}

export function updateAssets(assets: IAssets): reduxTypes.Action {
	return {
		type: CST.AC_ASSETS,
		value: assets
	}
}

export function updateResetPrice(px: number): reduxTypes.Action {
	return {
		type: CST.AC_RESET_PRICE,
		value: px
	}
}

export function updateBeta(beta: number): reduxTypes.Action {
	return {
		type: CST.AC_BETA,
		value: beta
	}
}

export function updateDayCount(count: number): reduxTypes.Action {
	return {
		type: CST.AC_DAY,
		value: count
	}
}

export function updateUpwardResetCount(count: number): reduxTypes.Action {
	return {
		type: CST.AC_UPWARD,
		value: count
	}
}

export function updateDownwardResetCount(count: number): reduxTypes.Action {
	return {
		type: CST.AC_DOWNWARD,
		value: count
	}
}

export function updatePeriodicResetCount(count: number): reduxTypes.Action {
	return {
		type: CST.AC_PERIODIC,
		value: count
	}
}
