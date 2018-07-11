export * from '../../../../../duo-admin/src/constants';

export const AC_CTD_STATES = 'custodianStates';
export const AC_CTD_PRICES = 'custodianPrices';
export const AC_ACCOUNT = 'account';
export const AC_NETWORK = 'network';
export const AC_BALANCES = 'balances';
export const AC_ALL_BALANCES = 'allBalances';
export const AC_ADDRESSES = 'addresses';
export const AC_DNM_STATUS = 'dynamoStatus';
export const AC_DMN_HOURLY = 'dynamoHourly';
export const AC_DMN_MINUTELY = 'dynamoMinutely';
export const AC_DMN_PRICE = 'dynamoPrice';
export const AC_TOTAL_SUPPLY = 'totalSupply';
export const AC_CONVERSION = 'conversion';
export const AC_REFRESH = 'refresh';
export const AC_ADDR_POOL = 'addressPool';
export const AC_GAS_PX = 'gasPrice';
export const AC_LOCALE = 'locale';

export const ETH_MAINNET_ID = 1;
export const ETH_KOVAN_ID = 42;

export const CTD_INCEPTION = 'Inception';
export const CTD_TRADING = 'Trading';
export const CTD_PRERESET = 'PreReset';
export const CTD_UP_RESET = 'UpwardReset';
export const CTD_DOWN_RESET = 'DownwardReset';
export const CTD_PERIOD_RESET = 'PeriodicReset';
export const CTD_LOADING = 'Loading';

export const RX_NUM = /^-?[0-9]+(\.[0-9]+)?$/;
export const RX_NUM_P = /^[0-9]+(\.[0-9]+)?$/;
export const RX_INTEGER = /^[0-9]+?$/;

export const PENDING_TX_TIMEOUT = 1200000;

export const LOCALE_CN = 'CN';
export const LOCALE_EN = 'EN';
export const LOCALE_RU = 'RU';
export const LOCALE_JP = 'JP';

export interface ILocaleText {
	EN: string;
	CN: string;
	// RU: string;
	// JP: string;
	[key: string]: string;
}

export const TH_CREATE: ILocaleText = {
	[LOCALE_CN]: '拆分',
	[LOCALE_EN]: 'Create'
};
export const TH_REDEEM: ILocaleText = {
	[LOCALE_CN]: '合并',
	[LOCALE_EN]: 'Redeem'
};
export const TH_ETH = 'ETH';
export const TH_DUO = 'DUO';
export const TH_TOKEN_A = 'Token A';
export const TH_TOKEN_B = 'Token B';
export const TH_APPROVE: ILocaleText = {
	[LOCALE_CN]: '授权',
	[LOCALE_EN]: 'Approve'
};
export const TH_TRANSFER: ILocaleText = {
	[LOCALE_CN]: '转账',
	[LOCALE_EN]: 'Transfer'
};
export const TH_SUBMIT: ILocaleText = {
	[LOCALE_CN]: '提交',
	[LOCALE_EN]: 'Submit'
};
export const TH_CLEAR: ILocaleText = {
	[LOCALE_CN]: '清空',
	[LOCALE_EN]: 'Clear'
};
export const TH_ADDRESS: ILocaleText = {
	[LOCALE_CN]: '地址',
	[LOCALE_EN]: 'Address'
};
export const TH_TIME: ILocaleText = {
	[LOCALE_CN]: '时间',
	[LOCALE_EN]: 'Time'
};
export const TH_STATUS: ILocaleText = {
	[LOCALE_CN]: '状态',
	[LOCALE_EN]: 'Status'
};
export const TH_MINED: ILocaleText = {
	[LOCALE_CN]: '已确认',
	[LOCALE_EN]: 'Mined'
};
export const TH_PENDING: ILocaleText = {
	[LOCALE_CN]: '待定',
	[LOCALE_EN]: 'Pending'
};
export const TH_CONVERSION: ILocaleText = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversion'
};
export const TH_OPERATION: ILocaleText = {
	[LOCALE_CN]: '操作',
	[LOCALE_EN]: 'Operation'
};
export const TH_PRICE: ILocaleText = {
	[LOCALE_CN]: '价格',
	[LOCALE_EN]: 'Price'
};
export const TH_BALANCE: ILocaleText = {
	[LOCALE_CN]: '余额',
	[LOCALE_EN]: 'Balance'
};
export const TH_ERC20 = 'ERC20';
export const TH_TYPE: ILocaleText = {
	[LOCALE_CN]: '类别',
	[LOCALE_EN]: 'Type'
};
export const TH_TOKEN_AB = 'Token A/B';
export const TH_FEE: ILocaleText = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Fee'
};
export const TH_LINK = 'Link';
export const TH_TOOLTIP = 'Tooltip';
export const TH_BEETHOVEN = 'Beethoven';
export const TH_CHART: ILocaleText = {
	[LOCALE_CN]: '图表',
	[LOCALE_EN]: 'Chart'
};
export const TH_1H = '1h';
export const TH_5M = '5m';
export const TH_PROCESS = 'Process';
export const TH_UPDATED = 'Updated';
export const TH_VOLUME = 'Volume';
export const TH_BLOCK = 'Block';
export const TH_ROLE = 'Role';
export const TH_APP = 'App';
export const TH_ALLOWANCE: ILocaleText = {
	[LOCALE_CN]: '授权额度',
	[LOCALE_EN]: 'Allowance'
};
export const TH_USER = 'User';
export const TH_NO = 'No';
export const TH_ADMIN = 'Admin';
export const TH_COLLLECT_FEE = 'Collect Fee';
export const TH_ADD_ADDR = 'Add Address';
export const TH_RM_ADDR = 'Remove Address';
export const TH_UPDATE_ROLE = 'Update Role';
export const TH_SET_VALUE = 'Set Value';
export const TH_POOL = 'Pool';
export const TH_STATE = 'State';
export const TH_VALUE = 'Value';
export const TH_ACTION = 'Action';
export const TH_DECODE = 'Decode';
export const TH_ACCOUNT = 'Account';
export const TH_REVERTED: ILocaleText = {
	[LOCALE_CN]: '失败',
	[LOCALE_EN]: 'Reverted'
};
export const TH_CONNECT = 'Connect';
export const TH_GUIDE: ILocaleText = {
	[LOCALE_CN]: '指南',
	[LOCALE_EN]: 'Guide'
};
export const TH_LAST_UPDATED: ILocaleText = {
	[LOCALE_CN]: '更新于',
	[LOCALE_EN]: 'Last Updated'
};
export const TH_LOADING: ILocaleText = {
	[LOCALE_CN]: '载入中',
	[LOCALE_EN]: 'Loading'
};
export const TH_LAST_RESET: ILocaleText = {
	[LOCALE_CN]: '前次折算',
	[LOCALE_EN]: 'Last Reset'
};
export const TH_RESET_PROGRESS: ILocaleText = {
	[LOCALE_CN]: '折算进度',
	[LOCALE_EN]: 'Reset Progress'
};
export const TH_CONTRACT_STATES: ILocaleText = {
	[LOCALE_CN]: '合约详情',
	[LOCALE_EN]: 'Contract States'
};
export const TH_PERIOD_LENGTH: ILocaleText = {
	[LOCALE_CN]: '周期',
	[LOCALE_EN]: 'Period Length'
};
export const TH_COUPON_PER_PERIOD: ILocaleText = {
	[LOCALE_CN]: '周期利率',
	[LOCALE_EN]: 'Coupon per Period'
};
export const TH_UPPER_A: ILocaleText = {
	[LOCALE_CN]: 'A级上限',
	[LOCALE_EN]: 'Upper Limit for Token A'
};
export const TH_UPPER_B: ILocaleText = {
	[LOCALE_CN]: 'B级上限',
	[LOCALE_EN]: 'Upper Limit for Token B'
};
export const TH_LOWER_B: ILocaleText = {
	[LOCALE_CN]: 'B级下限',
	[LOCALE_EN]: 'Lower Limit for Token B'
};
export const TH_LEVERAGE_FACTOR: ILocaleText = {
	[LOCALE_CN]: '杠杆因子',
	[LOCALE_EN]: 'Leverage Factor'
};
export const TH_CONVERSION_FACTOR: ILocaleText = {
	[LOCALE_CN]: '转化因子',
	[LOCALE_EN]: 'Conversion Factor'
};
export const TH_FEE_RATIO: ILocaleText = {
	[LOCALE_CN]: '费用比例',
	[LOCALE_EN]: 'Fee Ratio'
};
export const TH_DUO_RECEIVED: ILocaleText = {
	[LOCALE_CN]: '累计DUO手续费',
	[LOCALE_EN]: 'DUO Received'
};
export const TH_ETH_BALANCE: ILocaleText = {
	[LOCALE_CN]: 'ETH净余额',
	[LOCALE_EN]: 'Net ETH Balance'
};
export const TH_A_SUPPLY: ILocaleText = {
	[LOCALE_CN]: 'A级总量',
	[LOCALE_EN]: 'Token A Total Supply'
};
export const TH_B_SUPPLY: ILocaleText = {
	[LOCALE_CN]: 'B级总量',
	[LOCALE_EN]: 'Token B Total Supply'
};
export const TH_TOTAL_USERS: ILocaleText = {
	[LOCALE_CN]: '用户总数',
	[LOCALE_EN]: 'Total Users'
};
export const TH_SINCE_RESET: ILocaleText = {
	[LOCALE_CN]: '与折算相比',
	[LOCALE_EN]: 'Since Reset'
};
export const TH_PA: ILocaleText = {
	[LOCALE_CN]: '年化',
	[LOCALE_EN]: 'p.a.'
};
export const TH_LEVERAGE: ILocaleText = {
	[LOCALE_CN]: '杠杆',
	[LOCALE_EN]: 'Leverage'
};
export const TH_TOTAL: ILocaleText = {
	[LOCALE_CN]: '总共',
	[LOCALE_EN]: 'Total'
};
export const TH_CONVERSIONS: ILocaleText = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversions'
};
export const TH_CONVERSION_FEE: ILocaleText = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Conversion Fee'
};
export const TH_DISABLED: ILocaleText = {
	[LOCALE_CN]: '禁用',
	[LOCALE_EN]: 'Disabled'
};
export const TH_NETWORK_GAS_PRICE: ILocaleText = {
	[LOCALE_CN]: '网络Gas价格',
	[LOCALE_EN]: 'Network Gas Price'
};
export const TH_RANK: ILocaleText = {
	[LOCALE_CN]: '排名',
	[LOCALE_EN]: 'Rank'
};
export const TH_TOTAL_VOL: ILocaleText = {
	[LOCALE_CN]: '总量',
	[LOCALE_EN]: 'Total Volume'
};
export const TH_UPDATE_DAILY: ILocaleText = {
	[LOCALE_CN]: '每日更新',
	[LOCALE_EN]: 'update daily'
};

export const TT_TRADING_STATE: ILocaleText = {
	[LOCALE_CN]: '交易状态， 可执行所有操作',
	[LOCALE_EN]: 'Trading state, operations are permitted during current state.'
};
export const TT_RESET_STATE: ILocaleText = {
	[LOCALE_CN]: '折算中，无法执行任何操作',
	[LOCALE_EN]: 'Reset in progress, operations are prohibited during current state.'
};
export const TT_CTD_NAV: ILocaleText = {
	[LOCALE_CN]: '合约中显示的净值',
	[LOCALE_EN]: 'Nav as currently in Smart Contract.'
};
export const TT_EST_NAV: ILocaleText = {
	[LOCALE_CN]: '以所选价格估算的净值',
	[LOCALE_EN]: 'Estimated nav based selected ETH price.'
};
export const TT_RESULT_VARY: ILocaleText = {
	[LOCALE_CN]: '可能与实际结果存在误差',
	[LOCALE_EN]: 'May vary from actual result.'
};
export const TT_INPUT_AMOUNT: ILocaleText = {
	[LOCALE_CN]: '请输入数量',
	[LOCALE_EN]: 'Please input amount'
};
export const TT_INPUT_ADDR: ILocaleText = {
	[LOCALE_CN]: '请输入地址',
	[LOCALE_EN]: 'Please input address'
};
export const TT_INVALID_NUMBER: ILocaleText = {
	[LOCALE_CN]: '输入有误',
	[LOCALE_EN]: 'Invalid Number'
};
export const TT_BEETHOVEN_ADDR: ILocaleText = {
	[LOCALE_CN]: '点击输入' + TH_BEETHOVEN + '地址。无法往' + TH_BEETHOVEN + '地址转账。',
	[LOCALE_EN]:
		'Click to auto fill in ' +
		TH_BEETHOVEN +
		' address. Transfer to ' +
		TH_BEETHOVEN +
		' is disabled.'
};
export const TT_DUO_FEE_CHECK: ILocaleText = {
	[LOCALE_CN]: '由于DUO授权余额不足，操作可能失败。',
	[LOCALE_EN]: 'Insufficient DUO Allowance balance, transaction may fail.'
};
export const TT_NETWORK_CHECK: ILocaleText = {
	[LOCALE_CN]:
		'此页面只支持' + (__KOVAN__ ? 'KOVAN' : 'MainNet') + '，请在MetaMask中选择正确的网络',
	[LOCALE_EN]:
		'This page is built for ' +
		(__KOVAN__ ? 'KOVAN' : 'MainNet') +
		', please choose the corret network in Metamask'
};
