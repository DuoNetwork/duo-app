import * as CST from 'ts/common/constants';

export function updatePeriod(period: number) {
	return { type: CST.AC_UI_PERIOD, value: period };
}

export function updateSource(src: string) {
	return {
		type: CST.AC_UI_SOURCE,
		value: src
	};
}

export function localeUpdate(locale: string) {
	return {
		type: CST.AC_UI_LOCALE,
		value: locale
	};
}
