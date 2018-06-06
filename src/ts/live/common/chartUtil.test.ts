import moment from 'moment';
import chartUtil from './chartUtil';
import { IPriceBar } from './types';

const hourlyBar1 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar2 = {
	source: 'source',
	date: '2018-06-06',
	hour: '01',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 01:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar3 = {
	source: 'source',
	date: '2018-06-06',
	hour: '03',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 03:0', 'YYYY-MM-DD HH:m').valueOf()
};

test('does not interpolate unnecessarily', () => {
	const result = chartUtil.interpolate([hourlyBar1, hourlyBar2], true);
	expect(result.length).toBe(2);
	expect(result[0]).toBe(hourlyBar1);
	expect(result[1]).toEqual(hourlyBar2);
});

test('interpolate correctly', () => {
	const result = chartUtil.interpolate([hourlyBar1, hourlyBar3], true);
	expect(result.length).toBe(4);
	expect(result[0]).toBe(hourlyBar1);
	expect(result[3]).toEqual(hourlyBar3);
	expect(result[1]).toMatchSnapshot();
	expect(result[2]).toMatchSnapshot();
});

const minutelyBar1 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar2 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 1,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:1', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar3 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 3,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:3', 'YYYY-MM-DD HH:m').valueOf()
};

test('does not interpolate unnecessarily', () => {
	const result = chartUtil.interpolate([minutelyBar1, minutelyBar2], false);
	expect(result.length).toBe(2);
	expect(result[0]).toBe(minutelyBar1);
	expect(result[1]).toEqual(minutelyBar2);
});

test('interpolate correctly', () => {
	const result = chartUtil.interpolate([minutelyBar1, minutelyBar3], false);
	expect(result.length).toBe(4);
	expect(result[0]).toBe(minutelyBar1);
	expect(result[3]).toEqual(minutelyBar3);
	expect(result[1]).toMatchSnapshot();
	expect(result[2]).toMatchSnapshot();
});
