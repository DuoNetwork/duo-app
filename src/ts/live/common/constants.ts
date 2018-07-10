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
export const LOCALE_CN_CN = '中文';
export const LOCALE_EN = 'EN';
export const LOCALE_RU = 'RU';
export const LOCALE_JP = 'JP';
export const TH_CREATE: { [key: string]: string } = {
	[LOCALE_CN]: '拆分',
	[LOCALE_EN]: 'Create'
};
export const TH_REDEEM: { [key: string]: string } = {
	[LOCALE_CN]: '合并',
	[LOCALE_EN]: 'Redeem'
};
export const TH_ETH = 'ETH';
export const TH_DUO = 'DUO';
export const TH_TOKEN_A = 'Token A';
export const TH_TOKEN_B = 'Token B';
export const TH_APPROVE: { [key: string]: string } = {
	[LOCALE_CN]: '授权',
	[LOCALE_EN]: 'Approve'
};
export const TH_TRANSFER: { [key: string]: string } = {
	[LOCALE_CN]: '转账',
	[LOCALE_EN]: 'Transfer'
};
export const TH_SUBMIT: { [key: string]: string } = {
	[LOCALE_CN]: '提交',
	[LOCALE_EN]: 'Submit'
};
export const TH_CLEAR: { [key: string]: string } = {
	[LOCALE_CN]: '清空',
	[LOCALE_EN]: 'Clear'
};
export const TH_ADDRESS: { [key: string]: string } = {
	[LOCALE_CN]: '地址',
	[LOCALE_EN]: 'Address'
};
export const TH_TIME: { [key: string]: string } = {
	[LOCALE_CN]: '时间',
	[LOCALE_EN]: 'Time'
};
export const TH_STATUS: { [key: string]: string } = {
	[LOCALE_CN]: '状态',
	[LOCALE_EN]: 'Status'
};
export const TH_MINED: { [key: string]: string } = {
	[LOCALE_CN]: '已确认',
	[LOCALE_EN]: 'Mined'
};
export const TH_PENDING: { [key: string]: string } = {
	[LOCALE_CN]: '待定',
	[LOCALE_EN]: 'Pending'
};
export const TH_CONVERSION: { [key: string]: string } = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversion'
};
export const TH_OPERATION: { [key: string]: string } = {
	[LOCALE_CN]: '操作',
	[LOCALE_EN]: 'Operation'
};
export const TH_PRICE: { [key: string]: string } = {
	[LOCALE_CN]: '价格',
	[LOCALE_EN]: 'Price'
};
export const TH_BALANCE: { [key: string]: string } = {
	[LOCALE_CN]: '余额',
	[LOCALE_EN]: 'Balance'
};
export const TH_ERC20 = 'ERC20';
export const TH_TYPE: { [key: string]: string } = {
	[LOCALE_CN]: '类别',
	[LOCALE_EN]: 'Type'
};
export const TH_TOKEN_AB = 'Token A/B';
export const TH_FEE: { [key: string]: string } = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Fee'
};
export const TH_LINK = 'Link';
export const TH_TOOLTIP = 'Tooltip';
export const TH_BEETHOVEN = 'Beethoven';
export const TH_CHART: { [key: string]: string } = {
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
export const TH_ALLOWANCE: { [key: string]: string } = {
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
export const TH_REVERTED: { [key: string]: string } = {
	[LOCALE_CN]: '失败',
	[LOCALE_EN]: 'Reverted'
};
export const TH_CONNECT = 'Connect';
export const TH_GUIDE: { [key: string]: string } = {
	[LOCALE_CN]: '指南',
	[LOCALE_EN]: 'Guide'
};
export const TH_LAST_UPDATED: { [key: string]: string } = {
	[LOCALE_CN]: '更新于',
	[LOCALE_EN]: 'Last Updated'
};
export const TH_LOADING: { [key: string]: string } = {
	[LOCALE_CN]: '载入中',
	[LOCALE_EN]: 'Loading'
};
export const TH_LAST_RESET: { [key: string]: string } = {
	[LOCALE_CN]: '前次折算',
	[LOCALE_EN]: 'Last Reset'
};
export const TH_RESET_PROGRESS: { [key: string]: string } = {
	[LOCALE_CN]: '折算进度',
	[LOCALE_EN]: 'Reset Progress'
};
export const TH_CONTRACT_STATES: { [key: string]: string } = {
	[LOCALE_CN]: '合约详情',
	[LOCALE_EN]: 'Contract States'
};
export const TH_PERIOD_LENGTH: { [key: string]: string } = {
	[LOCALE_CN]: '周期',
	[LOCALE_EN]: 'Period Length'
};
export const TH_COUPON_PER_PERIOD: { [key: string]: string } = {
	[LOCALE_CN]: '周期利率',
	[LOCALE_EN]: 'Coupon per Period'
};
export const TH_UPPER_A: { [key: string]: string } = {
	[LOCALE_CN]: 'A级上限',
	[LOCALE_EN]: 'Upper Limit for Token A'
};
export const TH_UPPER_B: { [key: string]: string } = {
	[LOCALE_CN]: 'B级上限',
	[LOCALE_EN]: 'Upper Limit for Token B'
};
export const TH_LOWER_B: { [key: string]: string } = {
	[LOCALE_CN]: 'B级下限',
	[LOCALE_EN]: 'Lower Limit for Token B'
};
export const TH_LEVERAGE_FACTOR: { [key: string]: string } = {
	[LOCALE_CN]: '杠杆因子',
	[LOCALE_EN]: 'Leverage Factor'
};
export const TH_CONVERSION_FACTOR: { [key: string]: string } = {
	[LOCALE_CN]: '转化因子',
	[LOCALE_EN]: 'Conversion Factor'
};
export const TH_FEE_RATIO: { [key: string]: string } = {
	[LOCALE_CN]: '费用比例',
	[LOCALE_EN]: 'Fee Ratio'
};
export const TH_DUO_RECEIVED: { [key: string]: string } = {
	[LOCALE_CN]: '累计DUO手续费',
	[LOCALE_EN]: 'DUO Received'
};
export const TH_ETH_BALANCE: { [key: string]: string } = {
	[LOCALE_CN]: 'ETH净余额',
	[LOCALE_EN]: 'Net ETH Balance'
};
export const TH_A_SUPPLY: { [key: string]: string } = {
	[LOCALE_CN]: 'A级总量',
	[LOCALE_EN]: 'Token A Total Supply'
};
export const TH_B_SUPPLY: { [key: string]: string } = {
	[LOCALE_CN]: 'B级总量',
	[LOCALE_EN]: 'Token B Total Supply'
};
export const TH_TOTAL_USERS: { [key: string]: string } = {
	[LOCALE_CN]: '用户总数',
	[LOCALE_EN]: 'Total Users'
};
export const TH_SINCE_RESET: { [key: string]: string } = {
	[LOCALE_CN]: '与折算相比',
	[LOCALE_EN]: 'Since Reset'
};
export const TH_PA: { [key: string]: string } = {
	[LOCALE_CN]: '年化',
	[LOCALE_EN]: 'p.a.'
};
export const TH_LEVERAGE: { [key: string]: string } = {
	[LOCALE_CN]: '杠杆',
	[LOCALE_EN]: 'Leverage'
};
export const TH_TOTAL: { [key: string]: string } = {
	[LOCALE_CN]: '总共',
	[LOCALE_EN]: 'Total'
};
export const TH_CONVERSIONS: { [key: string]: string } = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversions'
};
export const TH_CONVERSION_FEE: { [key: string]: string } = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Conversion Fee'
};
export const TH_DISABLED: { [key: string]: string } = {
	[LOCALE_CN]: '禁用',
	[LOCALE_EN]: 'Disabled'
};
export const TH_NETWORK_GAS_PRICE: { [key: string]: string } = {
	[LOCALE_CN]: '网络Gas价格',
	[LOCALE_EN]: 'Network Gas Price'
};

export const TT_TRADING_STATE: { [key: string]: string } = {
	[LOCALE_CN]: '交易状态， 可执行所有操作',
	[LOCALE_EN]: 'Trading state, operations are permitted during current state.'
};
export const TT_RESET_STATE: { [key: string]: string } = {
	[LOCALE_CN]: '折算中，无法执行任何操作',
	[LOCALE_EN]: 'Reset in progress, operations are prohibited during current state.'
};
export const TT_CTD_NAV: { [key: string]: string } = {
	[LOCALE_CN]: '合约中显示的净值',
	[LOCALE_EN]: 'Nav as currently in Smart Contract.'
};
export const TT_EST_NAV: { [key: string]: string } = {
	[LOCALE_CN]: '以所选价格估算的净值',
	[LOCALE_EN]: 'Estimated nav based selected ETH price.'
};
export const TT_RESULT_VARY: { [key: string]: string } = {
	[LOCALE_CN]: '可能与实际结果存在误差',
	[LOCALE_EN]: 'May vary from actual result.'
};
export const TT_INPUT_AMOUNT: { [key: string]: string } = {
	[LOCALE_CN]: '请输入数量',
	[LOCALE_EN]: 'Please input amount'
};
export const TT_INPUT_ADDR: { [key: string]: string } = {
	[LOCALE_CN]: '请输入地址',
	[LOCALE_EN]: 'Please input address'
};
export const TT_INVALID_NUMBER: { [key: string]: string } = {
	[LOCALE_CN]: '输入有误',
	[LOCALE_EN]: 'Invalid Number'
};
export const TT_BEETHOVEN_ADDR: { [key: string]: string } = {
	[LOCALE_CN]: '点击输入' + TH_BEETHOVEN + '地址。无法往' + TH_BEETHOVEN + '地址转账。',
	[LOCALE_EN]:
		'Click to auto fill in ' +
		TH_BEETHOVEN +
		' address. Transfer to ' +
		TH_BEETHOVEN +
		' is disabled.'
};
export const TT_DUO_FEE_CHECK: { [key: string]: string } = {
	[LOCALE_CN]: '由于DUO授权余额不足，操作可能失败。',
	[LOCALE_EN]: 'Insufficient DUO Allowance balance, transaction may fail.'
};
