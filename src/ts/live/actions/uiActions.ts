import * as CST from '../common/constants';

export function updatePeriod(period: number) {
	return { type: CST.AC_PERIOD, value: period };
}

export function updateSource(src: string) {
	return {
		type: CST.AC_SOURCE,
		value: src
	};
}

export function localeUpdate(locale: string) {
	return {
		type: CST.AC_LOCALE,
		value: locale
	};
}
