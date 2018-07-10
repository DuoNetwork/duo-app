//import * as d3 from 'd3';
//import moment from 'moment';
import { Select } from 'antd';
import * as React from 'react';
import cnImg from '../../../../images/locale/cn.png';
import enImg from '../../../../images/locale/en.png';
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
				onSelect={value => onSelect(value + '')}
				className='locale-select'
				showArrow={false}
			>
				<Option value={CST.LOCALE_EN}><img className='locale-img' src={enImg}/>{CST.LOCALE_EN}</Option>
				<Option value={CST.LOCALE_CN}><img className='locale-img' src={cnImg}/>{CST.LOCALE_CN_CN}</Option>
			</SCardTitleSelector>
		);
	}
}
