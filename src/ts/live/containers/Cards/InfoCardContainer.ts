import { connect } from 'react-redux';
//import { AnyAction } from 'redux';
//import { ThunkDispatch } from 'redux-thunk';
import { ICustodianPrice, IPriceStatus, IState } from '../../common/types';
import InfoCard from '../../components/Cards/InfoCard';

function mapStateToProps(state: IState) {
	const bitfinex: ICustodianPrice = {
		address: '0x0',
		price: 0,
		timestamp: 0
	};
	const kraken: ICustodianPrice = {
		address: '0x0',
		price: 0,
		timestamp: 0
	};
	const gemini: ICustodianPrice = {
		address: '0x0',
		price: 0,
		timestamp: 0
	};
	const gdax: ICustodianPrice = {
		address: '0x0',
		price: 0,
		timestamp: 0
	};
	state.dynamo.status.forEach(s => {
		if (s.process === 'PRICE_AWS_PUBLIC_BITFINEX') {
			bitfinex.price = (s as IPriceStatus).price;
			bitfinex.timestamp = (s as IPriceStatus).timestamp;
		} else if (s.process === 'PRICE_AWS_PUBLIC_GEMINI') {
			gemini.price = (s as IPriceStatus).price;
			gemini.timestamp = (s as IPriceStatus).timestamp;
		} else if (s.process === 'PRICE_AWS_PUBLIC_KRAKEN') {
			kraken.price = (s as IPriceStatus).price;
			kraken.timestamp = (s as IPriceStatus).timestamp;
		} else if (s.process === 'PRICE_AWS_PUBLIC_GDAX') {
			gdax.price = (s as IPriceStatus).price;
			gdax.timestamp = (s as IPriceStatus).timestamp;
		}
	});
	return {
		account: state.contract.account,
		last: state.contract.prices.last,
		reset: state.contract.prices.reset,
		states: state.contract.states,
		navA: state.contract.states.navA,
		navB: state.contract.states.navB,
		balances: state.contract.balances,
		bitfinex,
		kraken,
		gemini,
		gdax
	};
}

export default connect(
	mapStateToProps,
	{}
)(InfoCard);
