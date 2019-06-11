export interface ILocaleText {
	EN: string;
	CN: string;
	[key: string]: string;
}
export const LOCALE_CN = 'CN';
export const LOCALE_EN = 'EN';

export const STK_TITLE: ILocaleText = {
	[LOCALE_CN]: 'DUO 质押活动',
	[LOCALE_EN]: 'DUO Staking Campaign'
};

export const STK_STATUS: ILocaleText = {
	[LOCALE_CN]: '系统状态',
	[LOCALE_EN]: 'Stake/Unstake'
};

export const STK_STAKE: ILocaleText = {
	[LOCALE_CN]: '质押',
	[LOCALE_EN]: 'Stake'
};

export const STK_UNSTAKE: ILocaleText = {
	[LOCALE_CN]: '解除质押',
	[LOCALE_EN]: 'Unstake'
};

export const STK_ENABLED: ILocaleText = {
	[LOCALE_CN]: '开放质押',
	[LOCALE_EN]: 'Enabled'
};

export const STK_DISABLED: ILocaleText = {
	[LOCALE_CN]: '质押暂停',
	[LOCALE_EN]: 'Disabled'
};

export const STK_ADDRESS: ILocaleText = {
	[LOCALE_CN]: '账户地址',
	[LOCALE_EN]: 'My Address'
};

export const STK_BALANCE: ILocaleText = {
	[LOCALE_CN]: '钱包余额',
	[LOCALE_EN]: 'Wallet Balance'
};

export const STK_AWARD: ILocaleText = {
	[LOCALE_CN]: '质押奖励',
	[LOCALE_EN]: 'Staking Award'
};

export const STK_APPROVE: ILocaleText = {
	[LOCALE_CN]: '授权 DUO',
	[LOCALE_EN]: 'Approve DUO'
};

export const STK_CLAIM: ILocaleText = {
	[LOCALE_CN]: '领取奖励',
	[LOCALE_EN]: 'Claim Award'
};

export const STK_ORACKE: ILocaleText = {
	[LOCALE_CN]: '报价节点',
	[LOCALE_EN]: 'Pricing Node'
};

export const STK_POOLSIZE: ILocaleText = {
	[LOCALE_CN]: '节点总额',
	[LOCALE_EN]: 'Node Balance'
};

export const STK_ESTREUTRN: ILocaleText = {
	[LOCALE_CN]: '预期收益率',
	[LOCALE_EN]: 'Est Return'
};

export const STK_MYSTAKE: ILocaleText = {
	[LOCALE_CN]: '已质押',
	[LOCALE_EN]: 'My Balance'
};

export const STK_ESTAWARD: ILocaleText = {
	[LOCALE_CN]: '预计每周回报',
	[LOCALE_EN]: 'Est Weekly Award'
};

export const STK_PLACEHODLER: ILocaleText = {
	[LOCALE_CN]: '输入质押数量',
	[LOCALE_EN]: 'Input Stake Amount'
};

export const STK_JOIN: ILocaleText = {
	[LOCALE_CN]: '参与质押',
	[LOCALE_EN]: 'Stake'
};

export const STK_WARING: ILocaleText = {
	[LOCALE_CN]: 'DUO余额不足。',
	[LOCALE_EN]: 'Not enough DUO balance.'
};

export const STK_WARING2: ILocaleText = {
	[LOCALE_CN]: '至少质押300DUO。',
	[LOCALE_EN]: 'Stake amount should not less than 300DUO.'
};

export const STK_REMIUNDER: ILocaleText = {
	[LOCALE_CN]: '提醒',
	[LOCALE_EN]: 'Reminder'
};

export const STK_REMIUNDERTEST: ILocaleText = {
	[LOCALE_CN]: '首次质押前请先授权DUO。',
	[LOCALE_EN]: 'Please apporve DUO before staking.'
};

export const STK_OK: ILocaleText = {
	[LOCALE_CN]: '授权DUO',
	[LOCALE_EN]: 'Approve Now'
};

export const STK_LOADINGNODES: ILocaleText = {
	[LOCALE_CN]: '载入节点中。。。',
	[LOCALE_EN]: 'Loading Nodes...'
};
