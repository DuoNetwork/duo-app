import * as CST from '../common/constants';
import { VoidThunkAction } from '../common/types';
import { IWSOrderBookSubscription } from '../common/types';
import websocketUtil from '../common/websocketUtil';

export function onSubscription(marketId: string, pair: string): VoidThunkAction {
	return async () => {
		await websocketUtil.subscribe(marketId, pair);
	};
}

export function orderBooksUpdate(message: IWSOrderBookSubscription) {
	return {
		type: CST.AC_SUBSCRIBE,
		[CST.AC_SUBSCRIBE]: message
	};
}
