import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import * as CST from 'ts/common/constants';
// import util from 'ts/common/util';
import { esplanadeWrapper } from 'ts/common/wrappers';
import * as esplanadeActions from './esplanadeActions';

const mockStore = configureMockStore([thunk]);

test('refresh', () => {
	const store: any = mockStore({
		esplanade: {
			states: {
				poolSizes: {
					cold: 3,
					hot: 3,
					custodian: 3,
					otherContract: 3
				}
			}
		}
	});

	esplanadeWrapper.getStates = jest.fn(() =>
		Promise.resolve({
			isStarted: false,
			votingStage: 'NotStarted',
			poolSizes: {
				hot: 3,
				cold: 3,
				custodian: 3,
				otherContract: 3
			},
			operationCoolDown: 1000,
			lastOperationTime: 123456789
		})
	);
	esplanadeWrapper.getModerator = jest.fn(() => Promise.resolve('0xModerator'));
	esplanadeWrapper.getCandidate = jest.fn(() => Promise.resolve('0xCandidate'));
	esplanadeWrapper.getAddressPoolAddress = jest.fn((isHot, i) =>
		Promise.resolve(`${isHot ? 'hot' : 'cold'}Address${i}`)
	);
	esplanadeWrapper.getContractPoolAddress = jest.fn((isCustodian, i) =>
		Promise.resolve(`${isCustodian ? 'custodian' : 'otherContract'}Address${i}`)
	);
	esplanadeWrapper.web3Wrapper.getEthBalance = jest.fn(() => Promise.resolve(100));
	esplanadeWrapper.getVotingData = jest.fn(() =>
		Promise.resolve({
			started: 0,
			votedFor: 0,
			votedAgainst: 0,
			totalVoters: 10
		})
	);
	store.dispatch(esplanadeActions.refresh());
	return new Promise(resolve =>
		setTimeout(() => {
			expect(store.getActions()).toMatchSnapshot();
			resolve();
		}, 0)
	);
});

test('subscriptionUpdate', () => {
	expect(esplanadeActions.subscriptionUpdate(123)).toMatchSnapshot();
});

test('subscribe', () => {
	window.setInterval = jest.fn(() => 123);
	const store: any = mockStore({
		esplanade: {
			states: {
				poolSizes: {
					cold: 3,
					hot: 3,
					custodian: 3,
					otherContract: 3
				}
			}
		}
	});
	esplanadeWrapper.getStates = jest.fn(() =>
		Promise.resolve({
			isStarted: false,
			votingStage: 'NotStarted',
			poolSizes: {
				hot: 3,
				cold: 3,
				custodian: 3,
				otherContract: 3
			},
			operationCoolDown: 1000,
			lastOperationTime: 123456789
		})
	);
	esplanadeWrapper.getModerator = jest.fn(() => Promise.resolve('0xModerator'));
	esplanadeWrapper.getCandidate = jest.fn(() => Promise.resolve('0xCandidate'));
	esplanadeWrapper.getAddressPoolAddress = jest.fn((isHot, i) =>
		Promise.resolve(`${isHot ? 'hot' : 'cold'}Address${i}`)
	);
	esplanadeWrapper.getContractPoolAddress = jest.fn((isCustodian, i) =>
		Promise.resolve(`${isCustodian ? 'custodian' : 'otherContract'}Address${i}`)
	);
	esplanadeWrapper.web3Wrapper.getEthBalance = jest.fn(() => Promise.resolve(100));
	esplanadeWrapper.getVotingData = jest.fn(() =>
		Promise.resolve({
			started: 0,
			votedFor: 0,
			votedAgainst: 0,
			totalVoters: 10
		})
	);
	// dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
	store.dispatch(esplanadeActions.subscribe());
	return new Promise(resolve =>
		setTimeout(() => {
			expect(store.getActions()).toMatchSnapshot();
			resolve();
		}, 0)
	);
});
