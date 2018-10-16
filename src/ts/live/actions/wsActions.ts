import * as CST from '../common/constants';
import { VoidThunkAction } from '../common/types';
import { IWSOrderBookSubscription } from '../common/types';
import wsUtil from '../common/wsUtil';

export function onSubscription(marketId: string, pair: string): VoidThunkAction {
	return async () => {
		await wsUtil.subscribe(marketId, pair);
	};
}

export function orderBooksUpdate(message: IWSOrderBookSubscription) {
	return {
		type: CST.AC_SUBSCRIBE,
		[CST.AC_SUBSCRIBE]: message
	};
}
