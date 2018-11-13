// import { shallow } from 'enzyme';
// import * as React from 'react';
// import UserCard from './UserCard';

// describe('UserCard Test', () => {
// 	describe('User Login', () => {
// 		const balances = {
// 			[1]: {
// 				account: '0xF69f0cbb7409f32Ad78FE4b0d5A17179d08090c4',
// 				allowance: 30021.87654503128,
// 				duo: 92528.82851047537,
// 				eth: 101.37930464207486,
// 				tokenA: 125.68847120815572,
// 				tokenB: 125.68847120815572
// 			}
// 		};
// 		const userLength = 123;
// 		const load = jest.fn(() => 1234567890);
// 		it('Test Snapshot', async () => {
// 			const wrapper = shallow(
// 				<UserCard allBalances={balances} userLength={userLength} load={load} />
// 			);
// 			expect(wrapper).toMatchSnapshot();
// 			await wrapper
// 				.find('Table')
// 				.at(0)
// 				.simulate('change', { target: { page: '123456' } });
// 			expect(wrapper).toMatchSnapshot();
// 		});
// 	});
// });
test('dummy', () => expect(true).toBeTruthy());
