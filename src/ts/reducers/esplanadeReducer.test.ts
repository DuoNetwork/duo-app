// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import * as CST from 'ts/common/constants';
import { espReducer, initialState } from './esplanadeReducer';

describe('esplanade reducer', () => {
	let state = initialState;

	test('default', () => {
		state = espReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('espSubscription on', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('espSubscription off', () => {
		window.clearInterval = jest.fn();
		state = espReducer(state, {
			type: CST.AC_ESP_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
		expect((window.clearInterval as jest.Mock<Promise<void>>).mock.calls).toMatchSnapshot();
	});

	test('espStates', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_STATES,
			value: {
				isStarted: true,
				votingStage: 'Moderator',
				operationCoolDown: 1000,
				lastOperationTime: 123456789,
				poolSizes: {
					cold: 3,
					hot: 3,
					custodian: 3,
					otherContract: 3
				}
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('espCandidate', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_CANDIDATE,
			address: 'candidateAddress',
			balance: 100
		});
		expect(state).toMatchSnapshot();
	});

	test('espModerator', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_MODERATOR,
			address: 'moderatorAddress',
			balance: 100
		});
		expect(state).toMatchSnapshot();
	});

	test('espHotAddr', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_HOT_ADDR,
			address: 'hotAddr',
			balance: 100,
			index: 1
		});
		expect(state).toMatchSnapshot();
	});

	test('espColdAddr', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_COLD_ADDR,
			address: 'coldAddr',
			balance: 100,
			index: 1
		});
		expect(state).toMatchSnapshot();
	});

	test('espCustodianAddr', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_CUSTODIAN_ADDR,
			address: 'custodianAddr',
			balance: 100,
			index: 1
		});
		expect(state).toMatchSnapshot();
	});

	test('espOtherContractAddr', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_OTHER_CONTRACT_ADDR,
			address: 'otherContractAddr',
			balance: 100,
			index: 1
		});
		expect(state).toMatchSnapshot();
	});

	test('espVotingData', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_VOTING_DATA,
			value: {
				started: 0,
				votedFor: 0,
				votedAgainst: 0,
				totalVoters: 10
			}
		});
		expect(state).toMatchSnapshot();
	});
});
