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
export const TH_CREATE: {[key: string]: string} = {
	[LOCALE_CN]: '拆分',
	[LOCALE_EN]: 'Create'
};
export const TH_REDEEM: {[key: string]: string} = {
	[LOCALE_CN]: '合并',
	[LOCALE_EN]: 'Redeem'
};
export const TH_ETH = 'ETH';
export const TH_DUO = 'DUO';
export const TH_TOKEN_A = 'Token A';
export const TH_TOKEN_B = 'Token B';
export const TH_APPROVE: {[key: string]: string} = {
	[LOCALE_CN]: '授权',
	[LOCALE_EN]: 'Approve'
};
export const TH_TRANSFER: {[key: string]: string} = {
	[LOCALE_CN]: '转账',
	[LOCALE_EN]: 'Transfer'
};
export const TH_SUBMIT: {[key: string]: string} = {
	[LOCALE_CN]: '提交',
	[LOCALE_EN]: 'Submit'
};
export const TH_CLEAR: {[key: string]: string} = {
	[LOCALE_CN]: '清空',
	[LOCALE_EN]: 'Clear'
};
export const TH_ADDRESS: {[key: string]: string} = {
	[LOCALE_CN]: '地址',
	[LOCALE_EN]: 'Address'
};
export const TH_TIME: {[key: string]: string} = {
	[LOCALE_CN]: '时间',
	[LOCALE_EN]: 'Time'
};
export const TH_STATUS: {[key: string]: string} = {
	[LOCALE_CN]: '状态',
	[LOCALE_EN]: 'Status'
};
export const TH_MINED: {[key: string]: string} = {
	[LOCALE_CN]: '已确认',
	[LOCALE_EN]: 'Mined'
};
export const TH_PENDING: {[key: string]: string} = {
	[LOCALE_CN]: '待定',
	[LOCALE_EN]: 'Pending'
};
export const TH_CONVERSION: {[key: string]: string} = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversion'
};
export const TH_OPERATION: {[key: string]: string} = {
	[LOCALE_CN]: '操作',
	[LOCALE_EN]: 'Operation'
};
export const TH_PRICE: {[key: string]: string} = {
	[LOCALE_CN]: '价格',
	[LOCALE_EN]: 'Price'
};
export const TH_BALANCE: {[key: string]: string} = {
	[LOCALE_CN]: '余额',
	[LOCALE_EN]: 'Balance'
};
export const TH_ERC20 = 'ERC20';
export const TH_TYPE: {[key: string]: string} = {
	[LOCALE_CN]: '类别',
	[LOCALE_EN]: 'Type'
};
export const TH_TOKEN_AB = 'Token A/B';
export const TH_FEE: {[key: string]: string} = {
	[LOCALE_CN]: '费用',
	[LOCALE_EN]: 'Fee'
};
export const TH_LINK = 'Link';
export const TH_TOOLTIP = 'Tooltip';
export const TH_BEETHOVEN = 'Beethoven';
export const TH_CHART: {[key: string]: string} = {
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
export const TH_ALLOWANCE = 'Allowance';
export const TH_ALLOWANCE_CN = '授权额度';
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
export const TH_REVERTED: {[key: string]: string} = {
	[LOCALE_CN]: '失败',
	[LOCALE_EN]: 'Reverted'
};
export const TH_CONNECT = 'Connect';
export const TH_GUIDE: {[key: string]: string} = {
	[LOCALE_CN]: '指南',
	[LOCALE_EN]: 'Guide'
};
export const TH_LAST_UPDATED: {[key: string]: string} = {
	[LOCALE_CN]: '更新于',
	[LOCALE_EN]: 'Last Updated'
};
export const TH_LOADING: {[key: string]: string} = {
	[LOCALE_CN]: '载入中',
	[LOCALE_EN]: 'Loading'
};
