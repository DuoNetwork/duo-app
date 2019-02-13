// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import moment from 'moment';
import dynamoUtil from 'ts/common/dynamoUtil';
import util from './util';

const convertedStatus = dynamoUtil.parseStatus({
	Items: [
		{
			process: {
				S: 'TRADE_AWS_PUBLIC_GEMINI'
			},
			amount: {
				N: '0.021854'
			},
			systime: {
				N: '1528081767574'
			},
			id: {
				S: '3830124454'
			},
			price: {
				N: '617.67'
			},
			timestamp: {
				N: '1528081767414'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PRIVATE_GDAX'
			},
			amount: {
				N: '0.112'
			},
			systime: {
				N: '1527756999570'
			},
			id: {
				S: '35215127'
			},
			price: {
				N: '568.74'
			},
			timestamp: {
				N: '1527756997255'
			}
		},
		{
			process: {
				S: 'MINUTELY_AWS_PUBLIC'
			},
			timestamp: {
				N: '1528081764433'
			}
		},
		{
			process: {
				S: 'HOURLY_AWS_PUBLIC'
			},
			timestamp: {
				N: '1528081753755'
			}
		},
		{
			process: {
				S: 'EVENT_AWS_PRIVATE_STARTPRERESET'
			},
			timestamp: {
				N: '1527751553589'
			}
		},
		{
			process: {
				S: 'FEED_AZURE_PRIVATE'
			},
			volume: {
				N: '210.82909559000007'
			},
			price: {
				N: '569.4241372856894'
			},
			timestamp: {
				N: '1527758100003'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PRIVATE_BITFINEX'
			},
			amount: {
				N: '2'
			},
			systime: {
				N: '1527832175767'
			},
			id: {
				S: '252575853'
			},
			price: {
				N: '573.84'
			},
			timestamp: {
				N: '1527831872000'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PRIVATE_KRAKEN'
			},
			amount: {
				N: '1.3'
			},
			systime: {
				N: '1527757007297'
			},
			id: {
				S: '1527756882730'
			},
			price: {
				N: '567.99'
			},
			timestamp: {
				N: '1527756882730'
			}
		},
		{
			process: {
				S: 'TRADE_GCP_PRIVATE_GEMINI'
			},
			amount: {
				N: '0.005219'
			},
			systime: {
				N: '1527766671464'
			},
			id: {
				S: '3806183351'
			},
			price: {
				N: '575.41'
			},
			timestamp: {
				N: '1527766669797'
			}
		},
		{
			process: {
				S: 'EVENT_AZURE_PRIVATE_STARTPRERESET'
			},
			timestamp: {
				N: '1527752331975'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PUBLIC_GDAX'
			},
			amount: {
				N: '6.52551355'
			},
			systime: {
				N: '1528081165788'
			},
			id: {
				S: '35402654'
			},
			price: {
				N: '616.14'
			},
			timestamp: {
				N: '1528081164613'
			}
		},
		{
			process: {
				S: 'TRADE_GCP_PRIVATE_BITFINEX'
			},
			amount: {
				N: '5.16121098'
			},
			systime: {
				N: '1527766706062'
			},
			id: {
				S: '252310341'
			},
			price: {
				N: '575.97'
			},
			timestamp: {
				N: '1527766704000'
			}
		},
		{
			process: {
				S: 'EVENT_GCP_PRIVATE_STARTPRERESET'
			},
			timestamp: {
				N: '1527752140470'
			}
		},
		{
			process: {
				S: 'TRADE_AZURE_PRIVATE_GEMINI'
			},
			amount: {
				N: '0.714947'
			},
			systime: {
				N: '1527757199295'
			},
			id: {
				S: '3805433931'
			},
			price: {
				N: '569.01'
			},
			timestamp: {
				N: '1527757197779'
			}
		},
		{
			process: {
				S: 'EVENT_GCP_PRIVATE_STARTRESET'
			},
			timestamp: {
				N: '1527752036379'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PUBLIC_BITFINEX'
			},
			amount: {
				N: '1.608'
			},
			systime: {
				N: '1528081780852'
			},
			id: {
				S: '253728500'
			},
			price: {
				N: '617.38'
			},
			timestamp: {
				N: '1528081780000'
			}
		},
		{
			process: {
				S: 'EVENT_AWS_PUBLIC_OTHERS'
			},
			block: {
				N: '7535634'
			},
			timestamp: {
				N: '1527846160749'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PUBLIC_KRAKEN'
			},
			amount: {
				N: '1.13'
			},
			systime: {
				N: '1528081780087'
			},
			id: {
				S: '1528081700549'
			},
			price: {
				N: '617.85'
			},
			timestamp: {
				N: '1528081700549'
			}
		},
		{
			process: {
				S: 'EVENT_AZURE_PRIVATE_STARTRESET'
			},
			timestamp: {
				N: '1527751947443'
			}
		},
		{
			process: {
				S: 'TRADE_AWS_PRIVATE_GEMINI'
			},
			amount: {
				N: '0.034274'
			},
			systime: {
				N: '1527757023351'
			},
			id: {
				S: '3805419800'
			},
			price: {
				N: '568.9'
			},
			timestamp: {
				N: '1527757021801'
			}
		},
		{
			process: {
				S: 'TRADE_AZURE_PRIVATE_KRAKEN'
			},
			amount: {
				N: '0.29453729'
			},
			systime: {
				N: '1527757219682'
			},
			id: {
				S: '1527757210567'
			},
			price: {
				N: '569.3'
			},
			timestamp: {
				N: '1527757210567'
			}
		},
		{
			process: {
				S: 'EVENT_AWS_PRIVATE_STARTRESET'
			},
			timestamp: {
				N: '1527751833800'
			}
		},
		{
			process: {
				S: 'TRADE_GCP_PRIVATE_KRAKEN'
			},
			amount: {
				N: '0.2'
			},
			systime: {
				N: '1527766716879'
			},
			id: {
				S: '1527766688094'
			},
			price: {
				N: '575.04'
			},
			timestamp: {
				N: '1527766688094'
			}
		},
		{
			process: {
				S: 'TRADE_AZURE_PRIVATE_BITFINEX'
			},
			amount: {
				N: '0.02548273'
			},
			systime: {
				N: '1527757210861'
			},
			id: {
				S: '252280437'
			},
			price: {
				N: '569.89'
			},
			timestamp: {
				N: '1527757209000'
			}
		},
		{
			process: {
				S: 'TRADE_AZURE_PRIVATE_GDAX'
			},
			amount: {
				N: '0.69683'
			},
			systime: {
				N: '1527757219988'
			},
			id: {
				S: '35215259'
			},
			price: {
				N: '569.09'
			},
			timestamp: {
				N: '1527757217889'
			}
		},
		{
			process: {
				S: 'TRADE_GCP_PRIVATE_GDAX'
			},
			amount: {
				N: '0.7576'
			},
			systime: {
				N: '1527766706635'
			},
			id: {
				S: '35220085'
			},
			price: {
				N: '575'
			},
			timestamp: {
				N: '1527766704262'
			}
		},
		{
			process: {
				S: 'FEED_AWS_PRIVATE'
			},
			volume: {
				N: '136.97828929999997'
			},
			price: {
				N: '584.6845'
			},
			timestamp: {
				N: '1527851700049'
			}
		},
		{
			process: {
				S: ''
			},
			volume: {
				N: '1085.5908951400004'
			},
			price: {
				N: '570.3235'
			},
			timestamp: {
				N: '1527757500018'
			}
		}
	],
	Count: 28,
	ScannedCount: 28
});
test('getLastPriceFromStatus', () =>
	expect(util.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('round', () => {
	expect(util.round(1.23456789012)).toBe(1.23456789);
});

test('formatTime', () => {
	expect(util.formatTime(1550028472000)).toMatchSnapshot();
})

test('formatNumber', () => {
	expect(util.formatNumber(1e-9)).toBe('0.000');
	expect(util.formatNumber(0.0123456)).toBe('0.01235');
	expect(util.formatNumber(1234.56789)).toBe('1,234.57');
	expect(util.formatNumber(123456.789)).toBe('123.5K');
	expect(util.formatNumber(1234567.89)).toBe('1.235M');
	expect(util.formatNumber(1234567890)).toBe('1.235B');
});

test('formatBalance', () => {
	expect(util.formatBalance(1e-9)).toBe('0.000');
	expect(util.formatBalance(0.0123456)).toBe('0.01235');
	expect(util.formatBalance(1234.56789)).toBe('1.235K');
});

test('getUTCNowTimestamp just now', () => {
	expect(util.convertUpdateTime(moment().valueOf() - 1000)).toBe('Just Now');
});

test('getUTCNowTimestamp miniutes', () => {
	expect(util.convertUpdateTime(moment().valueOf() - 3000000)).toBe('50 Minutes Ago');
});

test('getUTCNowTimestamp Hours', () => {
	expect(util.convertUpdateTime(moment().valueOf() - 82800000)).toBe('23 Hours Ago');
});

test('getUTCNowTimestamp days', () => {
	expect(util.convertUpdateTime(moment().valueOf() - 86400000)).toBe('1 Days Ago');
});

test('getUTCNowTimestamp Long Ago', () => {
	expect(util.convertUpdateTime(moment().valueOf() - 260000000000000000)).toBe('Long Time Ago');
});
