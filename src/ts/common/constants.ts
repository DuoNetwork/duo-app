import { Constants } from '@finbook/duo-contract-wrapper';
export const AC_DCC_STATES = 'dualClassStates';
export const AC_DCC_ADDRESSES = 'dualClassAddresses';
export const AC_DCC_EX_PX = 'dualClassExchangePrices';
export const AC_DCC_ACCEPTED_PX = 'dualClassAcceptedPrices';
export const AC_DCC_CONVERSIONS = 'dualClassConversions';
export const AC_DCC_BALANCES = 'dualClassBalances';
export const AC_DCC_SUB = 'dualClassSubscription';
export const AC_DCC_TYPE = 'dualClassType';
export const AC_MAG_ACCEPTED_PX = 'magiAcceptedPrices';
export const AC_MAG_SUB = 'magiSubscription';
export const AC_MAG_STATES = 'magiStates';
export const AC_MAG_PRICE_FEED = 'price feed';
export const AC_MAG_OPT = 'magiOperator';
export const AC_MAG_ROLE_MNG = 'magiRoleManager';
export const AC_MAG_PF = 'magiPriceFeed';
export const AC_ESP_SUB = 'esplanadeSubscription';
export const AC_ESP_MODERATOR = 'esplanadeModerator';
export const AC_ESP_CANDIDATE = 'esplanadeCandidate';
export const AC_ESP_STATES = 'esplanadeStates';
export const AC_ESP_HOT_ADDR = 'esplanadeHotAddress';
export const AC_ESP_COLD_ADDR = 'esplanadeColdAddress';
export const AC_ESP_CUSTODIAN_ADDR = 'esplanadeCustodianAddress';
export const AC_ESP_OTHER_CONTRACT_ADDR = 'esplanadeOtherContractAddress';
export const AC_ESP_VOTING_STAGE = 'esplanadeVotingStage';
export const AC_ESP_VOTING_DATA = 'esplanadeVotingData';
export const AC_STK_BALANCE = 'stakeBalance';
export const AC_STK_STATES = 'stakeStates';
export const AC_STK_ADDRESSES = 'stakeAddresses';
export const AC_STK_SUB = 'stakeSubscription';
export const AC_STK_USERSTAKE = 'userStake';
export const AC_STK_ORACLESTAKE = 'orcaleStake';
export const AC_STK_AWARD = 'userAward';
export const AC_STK_CONTRACTDUO = 'contractDUO';
export const AC_WEB3_ACCOUNT = 'web3Account';
export const AC_WEB3_NETWORK = 'web3Network';
export const AC_WEB3_BALACE = 'web3Balance';
export const AC_WEB3_GAS_PX = 'web3GasPrice';
export const AC_DNM_STATUS = 'dynamoStatus';
export const AC_UI_LOCALE = 'uiLocale';
export const AC_UI_PERIOD = 'uiPeriod';
export const AC_UI_SOURCE = 'uiSource';

export const AC_STK_NODES = ['Azure', 'AWS', 'GCP'];

export const TH_POOL_ADDRESS = 'Pool Address';
export const TH_ADD_CUSTODIAN = 'ADD CUSTODIAN';
export const TH_ADD_OTHER_CONTRACT = 'ADD OTHER CONTRACT';
export const TH_START_ESP = 'Start Esplanade';
export const TH_VOTING = 'Voting';
export const TH_VOTE_FOR = 'Vote For';
export const TH_VOTE_AGAINST = 'Vote Against';
export const TH_TERMINATE_VOTING = 'Terminate Voting';
export const TH_TERMINATE_BY_TIME_OUT = 'Terminate By Time Out';
export const TH_START_CONTRACT_VOTING = 'Start Contract Voting';
export const TH_START_MODERATOR_VOTING = 'Start Moderator Voting';

export const RX_NUM = /^-?[0-9]+(\.[0-9]+)?$/;
export const RX_NUM_P = /^[0-9]+(\.[0-9]+)?$/;
export const RX_INTEGER = /^[0-9]+?$/;

export const PENDING_TX_TIMEOUT = 1200000;
export const RELAYER_WS_URL = 'ws://localhost:8080';

export const LOCALE_CN = 'CN';
export const LOCALE_EN = 'EN';
export const LOCALE_RU = 'RU';
export const LOCALE_JP = 'JP';

export interface ILocaleText {
	EN: string;
	CN: string;
	RU: string;
	JP: string;
	[key: string]: string;
}

export const TH_CREATE: ILocaleText = {
	[LOCALE_CN]: '拆分',
	[LOCALE_EN]: 'Create',
	[LOCALE_JP]: '創造',
	[LOCALE_RU]: 'Создать'
};
export const TH_REDEEM: ILocaleText = {
	[LOCALE_CN]: '合并',
	[LOCALE_EN]: 'Redeem',
	[LOCALE_JP]: '償還',
	[LOCALE_RU]: 'Вывести'
};
export const TH_ETH = 'ETH';
export const TH_WETH = 'WETH';
export const TH_DUO = 'DUO';
export const TH_APPROVE: ILocaleText = {
	[LOCALE_CN]: '授权',
	[LOCALE_EN]: 'Approve',
	[LOCALE_JP]: '承認',
	[LOCALE_RU]: 'Подтвердить'
};
export const TH_TRANSFER: ILocaleText = {
	[LOCALE_CN]: '转账',
	[LOCALE_EN]: 'Transfer',
	[LOCALE_JP]: '送金',
	[LOCALE_RU]: 'Перевести'
};
export const TH_SUBMIT: ILocaleText = {
	[LOCALE_CN]: '提交',
	[LOCALE_EN]: 'Submit',
	[LOCALE_JP]: '提出',
	[LOCALE_RU]: 'Отправить'
};
export const TH_CANCEL: ILocaleText = {
	[LOCALE_CN]: '取消',
	[LOCALE_EN]: 'Cancel',
	[LOCALE_JP]: 'キャンセル',
	[LOCALE_RU]: 'Отменить'
};
export const TH_CLEAR: ILocaleText = {
	[LOCALE_CN]: '清空',
	[LOCALE_EN]: 'Clear',
	[LOCALE_JP]: 'クリア',
	[LOCALE_RU]: 'Очистить'
};
export const TH_ADDRESS: ILocaleText = {
	[LOCALE_CN]: '地址',
	[LOCALE_EN]: 'Address',
	[LOCALE_JP]: 'アドレス',
	[LOCALE_RU]: 'Адрес'
};
export const TH_TIME: ILocaleText = {
	[LOCALE_CN]: '时间',
	[LOCALE_EN]: 'Time',
	[LOCALE_JP]: '時間',
	[LOCALE_RU]: 'Время'
};
export const TH_STATUS: ILocaleText = {
	[LOCALE_CN]: '状态',
	[LOCALE_EN]: 'Status',
	[LOCALE_JP]: '状態',
	[LOCALE_RU]: 'Статус'
};
export const TH_NODATA: ILocaleText = {
	[LOCALE_CN]: '暂无数据',
	[LOCALE_EN]: 'No data',
	[LOCALE_JP]: '利用可能なデータがありません',
	[LOCALE_RU]: 'Нет данных'
};
export const TH_MINED: ILocaleText = {
	[LOCALE_CN]: '已确认',
	[LOCALE_EN]: 'Mined',
	[LOCALE_JP]: '確認済み',
	[LOCALE_RU]: 'Добыто'
};
export const TH_PENDING: ILocaleText = {
	[LOCALE_CN]: '待定',
	[LOCALE_EN]: 'Pending',
	[LOCALE_JP]: '保留中',
	[LOCALE_RU]: 'Выполняется'
};
export const TH_CONVERSION: ILocaleText = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversion',
	[LOCALE_JP]: 'コンバージョン',
	[LOCALE_RU]: 'Конверсия'
};
export const TH_OPERATION: ILocaleText = {
	[LOCALE_CN]: '操作',
	[LOCALE_EN]: 'Operation',
	[LOCALE_JP]: '操作',
	[LOCALE_RU]: 'Операция'
};
export const TH_PRICE: ILocaleText = {
	[LOCALE_CN]: '价格',
	[LOCALE_EN]: 'Price',
	[LOCALE_JP]: '価格',
	[LOCALE_RU]: 'Цена'
};
export const TH_BALANCE: ILocaleText = {
	[LOCALE_CN]: '余额',
	[LOCALE_EN]: 'Balance',
	[LOCALE_JP]: '残高',
	[LOCALE_RU]: 'Баланс'
};

export const TH_LABEL = 'Label';

export const TH_ERC20 = 'ERC20';
export const TH_TYPE: ILocaleText = {
	[LOCALE_CN]: '类别',
	[LOCALE_EN]: 'Type',
	[LOCALE_JP]: 'タイプ',
	[LOCALE_RU]: 'Тип'
};
export const TH_TOKEN_A = 'Token A';
export const TH_TOKEN_B = 'Token B';
export const TH_FEE: ILocaleText = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Fee',
	[LOCALE_JP]: '手数料',
	[LOCALE_RU]: 'Комиссия'
};
export const TH_LINK = 'Link';
export const TH_TOOLTIP = 'Tooltip';
export const TH_ORACLES = 'Oracles';
export const TH_CUSTODIANS = 'Custodians';
export const TH_OTHER_CONTRACTS = 'Other Contracts';
export const TH_MAGI = 'Magi';
export const TH_COVERED_OPTIONS = 'Covered Options';
export const TH_CHART: ILocaleText = {
	[LOCALE_CN]: '图表',
	[LOCALE_EN]: 'Chart',
	[LOCALE_JP]: 'チャート',
	[LOCALE_RU]: 'График'
};
export const TH_1H = '1h';
export const TH_5M = '5m';
export const TH_PROCESS = 'Process';
export const TH_UPDATE = 'Update';
export const TH_UPDATED = 'Updated';
export const TH_VOLUME = 'Volume';
export const TH_BLOCK = 'Block';
export const TH_ROLE = 'Role';
export const TH_APP = 'App';
export const TH_ALLOWANCE: ILocaleText = {
	[LOCALE_CN]: '授权额度',
	[LOCALE_EN]: 'Allowance',
	[LOCALE_JP]: '割当量',
	[LOCALE_RU]: 'Allowance'
};
export const TH_USER = 'User';
export const TH_NO = 'No';
export const TH_ADMIN = 'Admin';
export const TH_COLLECT_FEE = 'Collect Fee';
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
export const TH_ACCEPTED_PX = 'Accepted Prices';
export const TH_HOT_ADDR = 'Hot Addresses';
export const TH_COLD_ADDR = 'Cold Addresses';
export const TH_HOME: ILocaleText = {
	[LOCALE_CN]: '主页',
	[LOCALE_EN]: 'Home',
	[LOCALE_JP]: 'ホーム',
	[LOCALE_RU]: 'Home'
};
export const TH_REVERTED: ILocaleText = {
	[LOCALE_CN]: '失败',
	[LOCALE_EN]: 'Reverted',
	[LOCALE_JP]: '元戻る',
	[LOCALE_RU]: 'Отказ'
};
export const TH_CONNECT = 'Connect';
export const TH_GUIDE: ILocaleText = {
	[LOCALE_CN]: '指南',
	[LOCALE_EN]: 'Guide',
	[LOCALE_JP]: 'ガイド',
	[LOCALE_RU]: 'Инструкция'
};
export const TH_LAST_UPDATED: ILocaleText = {
	[LOCALE_CN]: '更新于',
	[LOCALE_EN]: 'Last Updated',
	[LOCALE_JP]: '直近のアップデート',
	[LOCALE_RU]: 'Последнее обновление'
};
export const TH_LOADING: ILocaleText = {
	[LOCALE_CN]: '载入中',
	[LOCALE_EN]: 'Loading',
	[LOCALE_JP]: 'ローディング',
	[LOCALE_RU]: 'Загрузка'
};
export const TH_LAST_RESET: ILocaleText = {
	[LOCALE_CN]: '前次折算',
	[LOCALE_EN]: 'Last Reset',
	[LOCALE_JP]: '直近のリセット',
	[LOCALE_RU]: 'Последний сброс'
};
export const TH_RESET_PROGRESS: ILocaleText = {
	[LOCALE_CN]: '折算进度',
	[LOCALE_EN]: 'Reset Progress',
	[LOCALE_JP]: 'リセット進度',
	[LOCALE_RU]: 'Идет сброс'
};
export const TH_CONTRACT_STATES: ILocaleText = {
	[LOCALE_CN]: '合约详情',
	[LOCALE_EN]: 'Contract States',
	[LOCALE_JP]: 'コントラクトの詳細',
	[LOCALE_RU]: 'Kонтракт'
};
export const TH_MATURITY: ILocaleText = {
	[LOCALE_CN]: '到期日',
	[LOCALE_EN]: 'Maturity',
	[LOCALE_JP]: '満期日',
	[LOCALE_RU]: 'Maturity'
};
export const TH_PERIOD_LENGTH: ILocaleText = {
	[LOCALE_CN]: '周期',
	[LOCALE_EN]: 'Period Length',
	[LOCALE_JP]: '期間',
	[LOCALE_RU]: 'Период'
};
export const TH_COUPON_PER_PERIOD: ILocaleText = {
	[LOCALE_CN]: '周期利率',
	[LOCALE_EN]: 'Coupon per Period',
	[LOCALE_JP]: '期間金利',
	[LOCALE_RU]: 'Купон за период'
};
export const TH_UPPER_A: ILocaleText = {
	[LOCALE_CN]: 'A级上限',
	[LOCALE_EN]: 'Upper Limit for Token A',
	[LOCALE_JP]: 'トークン A 上限',
	[LOCALE_RU]: 'Max лимит для Token А'
};
export const TH_UPPER_B: ILocaleText = {
	[LOCALE_CN]: 'B级上限',
	[LOCALE_EN]: 'Upper Limit for Token B',
	[LOCALE_JP]: 'トークン B 上限',
	[LOCALE_RU]: 'Max лимит для Token В'
};
export const TH_LOWER_B: ILocaleText = {
	[LOCALE_CN]: 'B级下限',
	[LOCALE_EN]: 'Lower Limit for Token B',
	[LOCALE_JP]: 'トークン B 下限',
	[LOCALE_RU]: 'Min лимит для Token В'
};
export const TH_LEVERAGE_FACTOR: ILocaleText = {
	[LOCALE_CN]: '杠杆因子',
	[LOCALE_EN]: 'Leverage Factor',
	[LOCALE_JP]: 'レバレッジファクター',
	[LOCALE_RU]: 'Коэф-т плеча кредитования'
};
export const TH_CONVERSION_FACTOR: ILocaleText = {
	[LOCALE_CN]: '转化因子',
	[LOCALE_EN]: 'Conversion Factor',
	[LOCALE_JP]: 'コンバージョンファクター',
	[LOCALE_RU]: 'Коэф-т конверсии'
};
// export const TH_FEE_RATIO: ILocaleText = {
// 	[LOCALE_CN]: '费用比例',
// 	[LOCALE_EN]: 'Fee Ratio',
// 	[LOCALE_JP]: '費用比率',
// 	[LOCALE_RU]: 'Соотношение'
// };
// export const TH_DUO_RECEIVED: ILocaleText = {
// 	[LOCALE_CN]: '累计DUO手续费',
// 	[LOCALE_EN]: 'DUO Received',
// 	[LOCALE_JP]: '累計DUO',
// 	[LOCALE_RU]: 'Получено DUO'
// };
export const TH_ETH_BALANCE: ILocaleText = {
	[LOCALE_CN]: 'ETH净余额',
	[LOCALE_EN]: 'Net ETH Balance',
	[LOCALE_JP]: 'ETH正味残高',
	[LOCALE_RU]: 'Чистый баланс ETH'
};
export const TH_A_SUPPLY: ILocaleText = {
	[LOCALE_CN]: 'A级总量',
	[LOCALE_EN]: 'Token A Total Supply',
	[LOCALE_JP]: 'トークン A 総供給',
	[LOCALE_RU]: 'Всего Token А'
};
export const TH_B_SUPPLY: ILocaleText = {
	[LOCALE_CN]: 'B级总量',
	[LOCALE_EN]: 'Token B Total Supply',
	[LOCALE_JP]: 'トークン B 総供給',
	[LOCALE_RU]: 'Всего Token В'
};
export const TH_TOTAL_USERS: ILocaleText = {
	[LOCALE_CN]: '用户总数',
	[LOCALE_EN]: 'Total Users',
	[LOCALE_JP]: 'ユーザー総数',
	[LOCALE_RU]: 'Всего пользователей'
};
export const TH_SINCE_RESET: ILocaleText = {
	[LOCALE_CN]: '与折算相比',
	[LOCALE_EN]: 'Since Reset',
	[LOCALE_JP]: 'リセット以来',
	[LOCALE_RU]: 'После сброса'
};
export const TH_PA: ILocaleText = {
	[LOCALE_CN]: '年化',
	[LOCALE_EN]: 'p.a.',
	[LOCALE_JP]: '毎年',
	[LOCALE_RU]: 'Ежегодно'
};
export const TH_LEVERAGE: ILocaleText = {
	[LOCALE_CN]: '杠杆',
	[LOCALE_EN]: 'Leverage',
	[LOCALE_JP]: 'レバレッジ',
	[LOCALE_RU]: 'Кредитное плечо'
};
export const TH_TOTAL: ILocaleText = {
	[LOCALE_CN]: '总共',
	[LOCALE_EN]: 'Total',
	[LOCALE_JP]: '合計',
	[LOCALE_RU]: 'Всего'
};
export const TH_CONVERSIONS: ILocaleText = {
	[LOCALE_CN]: '转化',
	[LOCALE_EN]: 'Conversions',
	[LOCALE_JP]: 'コンバージョン',
	[LOCALE_RU]: 'Конверсия'
};
export const TH_CONVERSION_FEE: ILocaleText = {
	[LOCALE_CN]: '手续费',
	[LOCALE_EN]: 'Conversion Fee',
	[LOCALE_JP]: 'コンバージョン手数料',
	[LOCALE_RU]: 'cтоимость конверсии'
};
export const TH_DISABLED: ILocaleText = {
	[LOCALE_CN]: '禁用',
	[LOCALE_EN]: 'Disabled',
	[LOCALE_JP]: '無効',
	[LOCALE_RU]: 'Отключено'
};
export const TH_NETWORK_GAS_PRICE: ILocaleText = {
	[LOCALE_CN]: '网络Gas价格',
	[LOCALE_EN]: 'Network Gas Price',
	[LOCALE_JP]: 'ネットワークガス価格',
	[LOCALE_RU]: 'Стоимость газа сети'
};
export const TH_RANK: ILocaleText = {
	[LOCALE_CN]: '排名',
	[LOCALE_EN]: 'Rank',
	[LOCALE_JP]: 'ランク',
	[LOCALE_RU]: 'Место'
};
export const TH_TOTAL_VOL: ILocaleText = {
	[LOCALE_CN]: '总量',
	[LOCALE_EN]: 'Total Volume',
	[LOCALE_JP]: '総量',
	[LOCALE_RU]: 'Общий объем'
};
export const TH_DAILY_VOL: ILocaleText = {
	[LOCALE_CN]: '当日总量',
	[LOCALE_EN]: 'Daily Volume',
	[LOCALE_JP]: 'Daily Volume',
	[LOCALE_RU]: 'Daily Volume'
};
export const TH_DAILY_BP: ILocaleText = {
	[LOCALE_CN]: '基础分',
	[LOCALE_EN]: 'BP',
	[LOCALE_JP]: 'BP',
	[LOCALE_RU]: 'BP'
};
export const TH_DAILY_RP: ILocaleText = {
	[LOCALE_CN]: '邀请分',
	[LOCALE_EN]: 'RP',
	[LOCALE_JP]: 'RP',
	[LOCALE_RU]: 'RP'
};
export const TH_DAILY_OP: ILocaleText = {
	[LOCALE_CN]: '预言分',
	[LOCALE_EN]: 'OP',
	[LOCALE_JP]: 'OP',
	[LOCALE_RU]: 'OP'
};
export const TH_TOTAL_POINT: ILocaleText = {
	[LOCALE_CN]: '总分',
	[LOCALE_EN]: 'Total Point',
	[LOCALE_JP]: 'Total Point',
	[LOCALE_RU]: 'Total Point'
};
export const TH_UPDATE_DAILY: ILocaleText = {
	[LOCALE_CN]: '每日更新',
	[LOCALE_EN]: 'update daily',
	[LOCALE_JP]: '毎日更新',
	[LOCALE_RU]: 'Оповещать ежедневно'
};

export const TH_PRICE_FEED: ILocaleText = {
	[LOCALE_CN]: '报价器地址',
	[LOCALE_EN]: 'price feed',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_NUM_OF_PRICE: ILocaleText = {
	[LOCALE_CN]: '价格数量',
	[LOCALE_EN]: '# of price',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_FIRST_PRICE: ILocaleText = {
	[LOCALE_CN]: '第一个价格',
	[LOCALE_EN]: 'first price',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_SECOND_PRICE: ILocaleText = {
	[LOCALE_CN]: '第二个价格',
	[LOCALE_EN]: 'second price',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_DATA_SOURCE: ILocaleText = {
	[LOCALE_CN]: '价格源',
	[LOCALE_EN]: 'data source',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_PRICE_FEED_TIME_TOLERANCE: ILocaleText = {
	[LOCALE_CN]: '报价器时间间隔误差',
	[LOCALE_EN]: 'price feed time tolerance',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_PRICE_FEED_TOLERANCE: ILocaleText = {
	[LOCALE_CN]: '报价器价格误差',
	[LOCALE_EN]: 'price feed tolerance',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_PRICE_FEED_COOL_DOWN: ILocaleText = {
	[LOCALE_CN]: '报价器冷却时间',
	[LOCALE_EN]: 'price cool down',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_PRICE_TOLERANCE: ILocaleText = {
	[LOCALE_CN]: '价格误差',
	[LOCALE_EN]: 'price tolerance',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_OPERATOR: ILocaleText = {
	[LOCALE_CN]: '管理者',
	[LOCALE_EN]: 'operator',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_ROLE_MANAGER: ILocaleText = {
	[LOCALE_CN]: '仲裁者',
	[LOCALE_EN]: 'role manager',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_UPDATE_PRICE_FEED: ILocaleText = {
	[LOCALE_CN]: '更改报价器',
	[LOCALE_EN]: 'update price feed',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_UPDATE_OPERATOR: ILocaleText = {
	[LOCALE_CN]: '更改管理者',
	[LOCALE_EN]: 'update operator',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_UPDATE_ESP: ILocaleText = {
	[LOCALE_CN]: '更改治理合约',
	[LOCALE_EN]: 'update role manager',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TH_SET_MAG_VALUE: ILocaleText = {
	[LOCALE_CN]: '更改参数',
	[LOCALE_EN]: 'Set Value',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TT_TRADING_STATE: ILocaleText = {
	[LOCALE_CN]: '交易状态， 可执行所有操作',
	[LOCALE_EN]: 'Trading state, operations are permitted during current state',
	[LOCALE_JP]: 'トレーディング状態、現在の状態で操作が許可されます',
	[LOCALE_RU]: 'Операции выполняются'
};
export const TT_RESET_STATE: ILocaleText = {
	[LOCALE_CN]: '折算中，无法执行任何操作',
	[LOCALE_EN]: 'Reset in progress, operations are prohibited during current state',
	[LOCALE_JP]: 'リセット進行中、現在の状態で操作が許可されません',
	[LOCALE_RU]: 'Операции не могут быть выполнены во время сброса'
};
export const TT_CTD_NAV: ILocaleText = {
	[LOCALE_CN]: '合约中显示的净值',
	[LOCALE_EN]: 'Nav as currently in Smart Contract',
	[LOCALE_JP]: '現在スマートコントラクトに示された純資産総額',
	[LOCALE_RU]: 'Стоимость согласно Smart Contract'
};
export const TT_EST_NAV: ILocaleText = {
	[LOCALE_CN]: '以所选价格估算的净值',
	[LOCALE_EN]: 'Estimated nav based selected ETH price',
	[LOCALE_JP]: '選択されたETH価格に基づく推定純資産総額',
	[LOCALE_RU]: 'Согласно стоимости ETH'
};
export const TT_RESULT_VARY: ILocaleText = {
	[LOCALE_CN]: '可能与实际结果存在误差',
	[LOCALE_EN]: 'May vary from actual result',
	[LOCALE_JP]: '際の結果と異なる場合がありえます',
	[LOCALE_RU]: 'Может отличаться от конечной суммы'
};
export const TT_INPUT_ETH_AMOUNT: ILocaleText = {
	///////////////////////////
	[LOCALE_CN]: '请输入ETH数量',
	[LOCALE_EN]: 'Please input ETH amount',
	[LOCALE_JP]: '数量を入力してください',
	[LOCALE_RU]: 'Введите сумму'
};
export const TT_INPUT_WETH_AMOUNT: ILocaleText = {
	/////////////////////////////
	[LOCALE_CN]: '请输入WETH数量',
	[LOCALE_EN]: 'Please input WETH amount',
	[LOCALE_JP]: '数量を入力してください',
	[LOCALE_RU]: 'Введите сумму'
};
export const TT_INPUT_ADDR: ILocaleText = {
	[LOCALE_CN]: '请输入地址',
	[LOCALE_EN]: 'Please input address',
	[LOCALE_JP]: 'アドレスを入力してください',
	[LOCALE_RU]: 'Введите адрес'
};

export const TT_INPUT_INDEX: ILocaleText = {
	[LOCALE_CN]: '请输入序列号码',
	[LOCALE_EN]: 'Please input index',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TT_INPUT_VALUE: ILocaleText = {
	[LOCALE_CN]: '请输入数值',
	[LOCALE_EN]: 'Please input number',
	[LOCALE_JP]: '',
	[LOCALE_RU]: ''
};

export const TT_INVALID_NUMBER: ILocaleText = {
	[LOCALE_CN]: '输入有误',
	[LOCALE_EN]: 'Invalid Number',
	[LOCALE_JP]: '無効な入力',
	[LOCALE_RU]: 'Некорректное число'
};
export const TT_BEETHOVEN_ADDR: ILocaleText = {
	[LOCALE_CN]:
		'点击输入' + Constants.BEETHOVEN + '地址。无法往' + Constants.BEETHOVEN + '地址转账。',
	[LOCALE_EN]:
		'Click to auto fill in ' +
		Constants.BEETHOVEN +
		' address. Transfer to ' +
		Constants.BEETHOVEN +
		' is disabled.',
	[LOCALE_JP]:
		'クリックしてオートフィルします' +
		Constants.BEETHOVEN +
		'アドレス、' +
		Constants.BEETHOVEN +
		'送金することができません',
	[LOCALE_RU]:
		'Нажмите для автозаполнения aдрес ' +
		Constants.BEETHOVEN +
		'. Функция трансфера в ' +
		Constants.BEETHOVEN +
		' отключена.'
};
// export const TT_DUO_FEE_CHECK: ILocaleText = {
// 	[LOCALE_CN]: '由于DUO授权余额不足，操作可能失败',
// 	[LOCALE_EN]: 'Insufficient DUO Allowance balance, transaction may fail',
// 	[LOCALE_JP]: 'DUOの割当残高不足のため、トランザクションが失敗する可能性があります',
// 	[LOCALE_RU]: 'Недостаточный баланс DUO, транзакция может быть не успешна'
// };
export const TT_NETWORK_CHECK: ILocaleText = {
	[LOCALE_CN]:
		'此页面只支持' + (__KOVAN__ ? 'KOVAN' : 'MainNet') + '，请在MetaMask中选择正确的网络',
	[LOCALE_EN]:
		'This page is built for ' +
		(__KOVAN__ ? 'KOVAN' : 'MainNet') +
		', please choose the correct network in MetaMask',
	[LOCALE_JP]:
		'このページは' +
		(__KOVAN__ ? 'KOVAN' : 'MainNet') +
		'のために作られています。メタマスクに、正しいネットワークを選んでください',
	[LOCALE_RU]:
		'Данная страница предназначена для ' +
		(__KOVAN__ ? 'KOVAN' : 'MainNet') +
		', выберите необходимую сеть в MetaMask'
};

export const TH_IS_STARTED = 'Is Started';
export const TH_LAST_OPT_TIME = 'Last Operation Time';
export const TH_OPT_COOL_DOWN = 'Operation Cooldown';
export const TH_VOTING_STAGE = 'Voting Stage';
export const TH_STARTED = 'Started';
export const TH_NOT_STARTED = 'Not Started';
export const TH_MODERATOR = 'Moderator';
export const TH_CANDIDATE = 'Candidate';
