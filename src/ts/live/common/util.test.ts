import util from './util';

test('calculateNav', () => {
	expect(util.calculateNav(120, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(40, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();

	expect(util.calculateNav(120, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(40, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();

	expect(util.calculateNav(120, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(20, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
});
