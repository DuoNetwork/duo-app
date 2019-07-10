export interface ILocaleText {
	EN: string;
	CN: string;
	[key: string]: string;
}
export const REFERRALTABLE = 'duo.live.referral';
export const STAKINGTABLE = 'duo.live.staking';
export const REFERRALCODE = 'Referral Code: ';

export const LOCALE_CN = 'CN';
export const LOCALE_EN = 'EN';

export const STK_TITLEFIX: ILocaleText = {
	[LOCALE_CN]: 'DUO 质押活动 (定期)',
	[LOCALE_EN]: 'DUO Staking (Term)'
};

export const STK_TITLEFLEX: ILocaleText = {
	[LOCALE_CN]: 'DUO 质押活动 (活期)',
	[LOCALE_EN]: 'DUO Staking (Flex)'
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
	[LOCALE_CN]: '待领奖励',
	[LOCALE_EN]: 'Award Balance'
};

export const STK_RAWARD: ILocaleText = {
	[LOCALE_CN]: '推荐奖励',
	[LOCALE_EN]: 'Referral Award'
};

export const STK_SAWARD: ILocaleText = {
	[LOCALE_CN]: '质押奖励',
	[LOCALE_EN]: 'Staking Award'
};

export const STK_DAILY: ILocaleText = {
	[LOCALE_CN]: '当日奖励',
	[LOCALE_EN]: 'Daily Award'
};

export const STK_SUM: ILocaleText = {
	[LOCALE_CN]: '累计奖励',
	[LOCALE_EN]: 'Sum Award'
};

export const STK_REFEREE: ILocaleText = {
	[LOCALE_CN]: '被推荐人地址',
	[LOCALE_EN]: 'Referee Addresses'
};

export const STK_NOREFEREE: ILocaleText = {
	[LOCALE_CN]: '暂无被推荐人信息',
	[LOCALE_EN]: 'Referee Infomation not available'
};

export const STK_NONODE: ILocaleText = {
	[LOCALE_CN]: '暂无节点信息',
	[LOCALE_EN]: 'Node Infomation not available'
};

export const STK_NODE: ILocaleText = {
	[LOCALE_CN]: '节点名称',
	[LOCALE_EN]: 'Staking Node'
};

export const STK_APPROVE: ILocaleText = {
	[LOCALE_CN]: '授权 DUO',
	[LOCALE_EN]: 'Approve DUO'
};

export const STK_CLAIM: ILocaleText = {
	[LOCALE_CN]: '领取奖励',
	[LOCALE_EN]: 'Claim Award'
};

export const STK_RLINK: ILocaleText = {
	[LOCALE_CN]: '推荐链接',
	[LOCALE_EN]: 'Referral Link'
};

export const STK_RINFO: ILocaleText = {
	[LOCALE_CN]: '推荐详情',
	[LOCALE_EN]: 'Referral Info'
};

export const STK_SINFO: ILocaleText = {
	[LOCALE_CN]: '质押详情',
	[LOCALE_EN]: 'Staking Info'
};

export const STK_BRLINK: ILocaleText = {
	[LOCALE_CN]: '绑定推荐人',
	[LOCALE_EN]: 'Bind Referrer'
};

export const STK_RCODE: ILocaleText = {
	[LOCALE_CN]: '推荐码:',
	[LOCALE_EN]: 'Referral Code:'
};

export const STK_RCODEUSED: ILocaleText = {
	[LOCALE_CN]: '已使用推荐码: ',
	[LOCALE_EN]: 'Already binded with referral Code: '
};

export const STK_BIND: ILocaleText = {
	[LOCALE_CN]: '绑 定',
	[LOCALE_EN]: 'Bind'
};

export const STK_BINDINPUTPH: ILocaleText = {
	[LOCALE_CN]: '请输入推荐码',
	[LOCALE_EN]: 'Please input referral code'
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
	[LOCALE_CN]: '质押数量需大于',
	[LOCALE_EN]: 'Stake amount should not less than'
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

export const STK_BTNOK: ILocaleText = {
	[LOCALE_CN]: '好的',
	[LOCALE_EN]: 'OK'
};

export const STK_RLDESKTOP: ILocaleText = {
	[LOCALE_CN]: '桌面用户推荐链接:',
	[LOCALE_EN]: 'For desktop user:'
};

export const STK_RLMOBILE: ILocaleText = {
	[LOCALE_CN]: '手机用户推荐链接',
	[LOCALE_EN]: 'For mobile user:'
};

export const STK_COPY: ILocaleText = {
	[LOCALE_CN]: '复制',
	[LOCALE_EN]: 'COPY'
};

export const STK_COPIED: ILocaleText = {
	[LOCALE_CN]: '已复制',
	[LOCALE_EN]: 'COPIED'
};

export const STK_LOADING: ILocaleText = {
	[LOCALE_CN]: '载入中',
	[LOCALE_EN]: 'Loading'
};

export const STK_LOADINGNODES: ILocaleText = {
	[LOCALE_CN]: '载入节点中。。。',
	[LOCALE_EN]: 'Loading Nodes...'
};

export const STK_ACCINFO: ILocaleText = {
	[LOCALE_CN]: '账户信息',
	[LOCALE_EN]: 'Account Info'
};

export const STK_CTSTATUS: ILocaleText = {
	[LOCALE_CN]: '合约状态',
	[LOCALE_EN]: 'Contract Status'
};

export const STK_STAKESTATUS: ILocaleText = {
	[LOCALE_CN]: '质押状态',
	[LOCALE_EN]: 'Stake Status'
};

export const STK_CTRULES: ILocaleText = {
	[LOCALE_CN]: '合约规则',
	[LOCALE_EN]: 'Staking Rules'
};

export const STK_CTMINSTAKE: ILocaleText = {
	[LOCALE_CN]: '最低质押量',
	[LOCALE_EN]: 'Min Staking Amount'
};

export const STK_CTLOCKTIME: ILocaleText = {
	[LOCALE_CN]: '质押锁定时间',
	[LOCALE_EN]: 'Staking Lock Time'
};

export const STK_CTSTAKE: ILocaleText = {
	[LOCALE_CN]: '合约总质押',
	[LOCALE_EN]: 'Total Staking Amount'
};

export const STK_CTRETURN: ILocaleText = {
	[LOCALE_CN]: '最大回报率',
	[LOCALE_EN]: 'Max Est Return'
};

export const STK_ALRBIND: ILocaleText = {
	[LOCALE_CN]: '已经提交过绑定码，无法再次提交',
	[LOCALE_EN]: 'You have already registered a referral code'
}

export const STK_RCWARING: ILocaleText = {
	[LOCALE_CN]: '绑定码需为6位字符串',
	[LOCALE_EN]: 'Referral code should be a length 6 string'
}

export const STK_BINDED: ILocaleText = {
	[LOCALE_CN]: '绑定成功',
	[LOCALE_EN]: 'Bind Success'
}

export const STK_TOFLEX: ILocaleText = {
	[LOCALE_CN]: '前往活期合约',
	[LOCALE_EN]: 'To Flex Staking'
}

export const STK_TOFIX: ILocaleText = {
	[LOCALE_CN]: '前往定期合约',
	[LOCALE_EN]: 'To Term Staking'
}

export const STK_UNLOCKUNTIL: ILocaleText = {
	[LOCALE_CN]: '解锁于 ',
	[LOCALE_EN]: 'Lock until '
}

export const STK_NOSTAKE: ILocaleText = {
	[LOCALE_CN]: '暂未质押DUO',
	[LOCALE_EN]: 'No Staking amount'
}
