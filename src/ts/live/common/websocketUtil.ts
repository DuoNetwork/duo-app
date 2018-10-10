import WebSocket from 'isomorphic-ws';
import * as CST from './constants';
import { IWSChannel, IWSOrderBookSubscription } from './types';
import util from './util';

class WsUtil {
	public ws: WebSocket | null = null;
	private handleOrderBooksUpdate: ((orderBooks: IWSOrderBookSubscription) => any) | null = null;
	public init(host: string) {
		console.log(host);
		this.ws = new WebSocket(host);
		this.ws.onmessage = (m: any) => this.handleMessage(m.data.toString());
	}

	public handleMessage(message: string) {
		const wsMsg: IWSChannel = JSON.parse(message);
		const type = wsMsg.type;
		switch (type) {
			case CST.AC_UPDATE:
				if (this.handleOrderBooksUpdate) {
					const obRes = wsMsg as IWSOrderBookSubscription;
					// const src = others[0];
					if (obRes && obRes.asks && obRes.bids) {
						obRes.delay = util.getNowTimestamp() - obRes.timestamp;
						console.log("obRes");
						this.handleOrderBooksUpdate(obRes);
					}
				}
				break;
			default:
				break;
		}
	}

	public subscribe(name: string, marketId: string) {
		if (this.ws && name && marketId) {
			const req = {
				type: 'subscribe',
				channel: {
					name: name,
					marketId: marketId
				},
				requestId: Date.now().toString()
			};
			if (this.ws.readyState !== WebSocket.OPEN) {
				const wss = this.ws;
				this.ws.onopen = function open() {
					console.log('Connected');
					wss.send(JSON.stringify(req));
				};
			} else this.ws.send(JSON.stringify(req));
		}
	}

	public onOrderBooks(handleOrderBooksUpdate: (orderBooks: IWSOrderBookSubscription) => any) {
		this.handleOrderBooksUpdate = handleOrderBooksUpdate;
	}

}

const wsUtil = new WsUtil();
export default wsUtil;
