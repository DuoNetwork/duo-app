//import * as d3 from 'd3';
//import moment from 'moment';
import { Select } from 'antd';
import * as React from 'react';
import cnImg from '../../../../images/locale/cn.png';
import enImg from '../../../../images/locale/en.png';
import jpImg from '../../../../images/locale/jp.png';
import ruImg from '../../../../images/locale/ru.png';
import * as CST from '../../common/constants';
import { SCardTitleSelector } from '../Cards/_styled';

const Option = Select.Option;

interface IProps {
	locale: string;
	onSelect: (value: string) => any;
}

export default class CardTitleSelect extends React.PureComponent<IProps> {
	public render() {
		const { locale, onSelect } = this.props;
		return (
			<SCardTitleSelector
				value={locale}
				size="small"
				onSelect={(value: any) => onSelect(value + '')}
				className="locale-select"
				showArrow={false}
			>
				<Option value={CST.LOCALE_EN}>
					<img className="locale-img" src={enImg} />
					{CST.LOCALE_EN}
				</Option>
				<Option value={CST.LOCALE_CN}>
					<img className="locale-img" src={cnImg} />中文
				</Option>
				<Option value={CST.LOCALE_JP}>
					<img className="locale-img" src={jpImg} />日本語
				</Option>
				<Option value={CST.LOCALE_RU}>
					<img className="locale-img" src={ruImg} />PУССКИЙ
				</Option>
			</SCardTitleSelector>
		);
	}
}
