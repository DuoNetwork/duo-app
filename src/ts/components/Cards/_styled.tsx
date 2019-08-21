import { Button, Card, Radio, Select } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import * as CST from 'ts/common/constants';
import { ColorStyles } from 'ts/common/styles';

const RadioGroup = Radio.Group;

export interface ICardProps {
	width?: string;
	height?: string;
	margin?: string;
	inlinetype?: string;
}

export const SCard = styled(Card)`
	overflow: hidden;
	max-width: 1060px;
	width: ${(props: ICardProps) => props.width};
	height: ${(props: ICardProps) => props.height};
	margin: ${(props: ICardProps) => props.margin};
	display: ${(props: ICardProps) => (props.inlinetype ? 'inline-table' : '')};
	background: ${ColorStyles.CardBackground};
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	border: none !important;
	& > .ant-card-head {
		height: 50px;
		background: ${ColorStyles.MainColor} !important;
		background: none;
		border-bottom: none;
		padding: 0 16px;
	}
	& > .ant-card-body {
		padding: 0px 16px 16px 16px;
	}
`;

injectGlobal([
	`
	body {
		.ant-card-head-title {
			padding: 12px 0;
		}
		.ant-card-wider-padding .ant-card-head{
			padding: 0 16px;
		}
		.ant-card-wider-padding .ant-card-body{
			padding: 0px 16px 16px 16px;
		}
		.ant-card-head-wrapper {
			border-bottom: 1px solid rgba(255,255,255,.05);
		}
		.card-disable {
			pointer-events: none !important;
			opacity: 0.5;
		}
		.sc-bZQynM.eqSxah {
			width: 30%;
		}
		.sc-gzVnrw.ckhMSO {
			width: 30%;
		}
	}
`
] as any);

export const SCardTitle = styled.div`
	color: ${ColorStyles.TextWhite};
	font-family: 'Roboto', 'Microsoft YaHei';
	font-weight: 500;
	letter-spacing: 2px;
	font-size: 16px;
	padding-left: 12px;
`;

export const SCardTitleSelector = styled(Select as any)`
	.ant-select-selection {
		border-radius: 0;
		color: ${ColorStyles.TextWhiteAlpha};
		background-color: transparent;
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite3};
		font-size: 10px;
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 400;
		letter-spacing: 0;
		span {
			color: ${ColorStyles.TextWhiteAlphaL};
		}
	}
	.ant-select-selection:focus {
		-webkit-box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
	}
`;

export const SCardTitleSwitch = styled.div`
	span {
		cursor: pointer;
		transition: all, 0.2s;
	}
	span:hover {
		text-shadow: 0 0 1px rgba(255, 255, 255, .5);
		opacity: 0.9 !important;
	}
	span:first-child {
		margin-right: 10px;
	}
	span:last-child {
		margin-left: 10px;
	}
`;

injectGlobal([
	`
	body {
		.ant-select-dropdown {
			border-radius: 0;
			font-size: 10px;
			font-family: 'Roboto', 'Microsoft YaHei';
			background: ${ColorStyles.HeaderBackground};
			box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
		}
		.ant-select-dropdown-menu-item {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-select-dropdown-menu-item:hover {
			background: ${ColorStyles.HoverBackgroundSolid};
		}
		.ant-select-dropdown-menu-item-selected, .ant-select-dropdown-menu-item-selected:hover {
			color: ${ColorStyles.TextWhiteAlpha};
			background: ${ColorStyles.SelectBackgroundSolid};
			font-weight: 500;
		}
		.ant-select-dropdown-menu-item:first-child, .ant-select-dropdown-menu-item:last-child {
			border-radius: 0;
		}
	}
`
] as any);
export interface ICardPriceTagProps {
	mobile?: boolean;
	locale?: string;
	disabled?: boolean;
}
export const SCardPriceTag = styled.div`
	height: 100px;
	width: ${(props: ICardPriceTagProps) => (props.mobile ? '100%' : '165px')};
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		right: ${(props: ICardPriceTagProps) => (props.mobile ? '-15px' : '-35px')};
		top: 10px;
	}
	.bg-logo > img {
		height: 100%;
		width: 100%;
		opacity: 0.05;
		pointer-events: none;
	}
	.tag-title {
		width: 90px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			width: 10px;
			height: 10px;
			margin-left: 6px;
			opacity: 0.6;
		}
	}
	.tag-title > a {
		margin: 0;
	}
	.tag-title > a,
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
		z-index: 99;
		text-decoration: none;
	}
	.tag-content {
		width: 120px;
		margin-left: 20px;
		margin-top: 10px;
		.tag-subtext {
			font-size: ${(props: ICardPriceTagProps) =>
				props.locale === CST.LOCALE_JP
					? '11px'
					: props.locale === CST.LOCALE_RU
					? '10px'
					: '12px'};
			display: flex;
			flex-direction: row;
			color: ${ColorStyles.ThemeTextAlpha};
		}
	}
	.tag-price {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-unit {
		margin-left: 2px;
		color: ${ColorStyles.TextWhiteAlphaL};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-price-1 {
		color: ${ColorStyles.TextTokenA};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: ${ColorStyles.TextTokenB};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-3 {
		color: white;
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		margin-bottom: 5px;
		margin-left: 6px;
		width: 60px;
		text-align: right;
	}
	.tag-unit-1,
	.tag-unit-2 {
		margin-left: 2px;
		color: ${ColorStyles.TextWhiteAlphaL};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-unit-3 {
		color: ${ColorStyles.TextWhiteAlphaL};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;

export const SCardTag = styled.div`
	height: 85px;
	width: ${(props: ICardPriceTagProps) => (props.mobile ? '100%' : '210px')};
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	transition: all 0.3s;
	pointer-events: ${(props: ICardPriceTagProps) => (props.disabled ? 'none !important' : '')};
	opacity: ${(props: ICardPriceTagProps) => (props.disabled ? '0.5' : '1')};
	&:hover {
		background: ${ColorStyles.LightHoverSolid};
	}
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		right: ${(props: ICardPriceTagProps) => (props.mobile ? '-15px' : '-35px')};
		top: 0px;
	}
	.bg-logo > img {
		height: 100%;
		width: 100%;
		opacity: 0.05;
		pointer-events: none;
	}
	.tag-title {
		width: 90px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			width: 10px;
			height: 10px;
			margin-left: 6px;
			opacity: 0.6;
		}
	}
	.tag-title > a {
		margin: 0;
	}
	.tag-title > a,
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
		z-index: 99;
		text-decoration: none;
	}
	.tag-content {
		width: 220px;
		margin-left: 20px;
		margin-top: 10px;
		.tag-subtext {
			font-size: ${(props: ICardPriceTagProps) =>
				props.locale === CST.LOCALE_JP
					? '11px'
					: props.locale === CST.LOCALE_RU
					? '10px'
					: '12px'};
			display: flex;
			flex-direction: row;
			color: ${ColorStyles.ThemeTextAlpha};
		}
	}
	.tag-price {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-unit {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-price-1 {
		color: ${ColorStyles.TextTokenA};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: ${ColorStyles.TextTokenB};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-3 {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		margin-bottom: 5px;
		margin-left: 6px;
		width: 60px;
		text-align: right;
	}
	.tag-unit-1,
	.tag-unit-2 {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-unit-3 {
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;
export const SCardTag2 = styled.div`
	height: 85px;
	width: ${(props: ICardPriceTagProps) => (props.mobile ? '100%' : '230px')};
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	transition: all 0.3s;
	pointer-events: ${(props: ICardPriceTagProps) => (props.disabled ? 'none !important' : '')};
	opacity: ${(props: ICardPriceTagProps) => (props.disabled ? '0.5' : '1')};
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		right: ${(props: ICardPriceTagProps) => (props.mobile ? '-15px' : '-25px')};
		top: 0px;
	}
	.bg-logo > img {
		height: 100%;
		width: 100%;
		opacity: 0.05;
		pointer-events: none;
	}
	.tag-title {
		width: 90px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			width: 10px;
			height: 10px;
			margin-left: 6px;
			opacity: 0.6;
		}
	}
	.tag-title > a {
		margin: 0;
	}
	.tag-title > a,
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
		z-index: 99;
		text-decoration: none;
	}
	.tag-content {
		width: 220px;
		margin-left: 20px;
		margin-top: 10px;
		.tag-subtext {
			font-size: 18px;
			display: flex;
			flex-direction: row;
			color: ${ColorStyles.ThemeText};
		}
	}
	.tag-price {
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.tag-unit {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-price-1 {
		color: ${ColorStyles.TextTokenA};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: ${ColorStyles.TextTokenB};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-3 {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		margin-bottom: 5px;
		margin-left: 6px;
		width: 60px;
		text-align: right;
	}
	.tag-unit-1,
	.tag-unit-2 {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-unit-3 {
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;
export const SCardTag3 = styled.div`
	height: 90px;
	width: 200px;
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	transition: all 0.3s;
	pointer-events: ${(props: ICardPriceTagProps) => (props.disabled ? 'none !important' : '')};
	opacity: ${(props: ICardPriceTagProps) => (props.disabled ? '0.5' : '1')};
	&:hover {
		background: ${ColorStyles.LightHoverSolid};
	}
	.tag-title {
		width: 90px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			width: 10px;
			height: 10px;
			margin-left: 6px;
			opacity: 0.6;
		}
	}
	.tag-title > a {
		margin: 0;
	}
	.tag-title > a,
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
		z-index: 99;
		text-decoration: none;
	}
	.tag-content {
		width: 180px;
		margin-left: 10px;
		.tag-subtext {
			margin-top: 8px;
			font-size: 18px;
			display: flex;
			flex-direction: row;
			color: ${ColorStyles.ThemeText};
		}
	}
	.tag-price {
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.tag-unit {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-price-1 {
		color: ${ColorStyles.TextTokenA};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: ${ColorStyles.TextTokenB};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-3 {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		margin-bottom: 5px;
		margin-left: 6px;
		width: 60px;
		text-align: right;
	}
	.tag-unit-1,
	.tag-unit-2 {
		margin-left: 2px;
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 5.5px;
	}
	.tag-unit-3 {
		color: ${ColorStyles.ThemeTextAlpha};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;
export const SCardTag4 = styled.div`
	height: 115px;
	width: ${(props: ICardPriceTagProps) => (props.mobile ? '100%' : '250px')};
	position: relative;
	margin-top: 15px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	transition: all 0.3s;
	pointer-events: ${(props: ICardPriceTagProps) => (props.disabled ? 'none !important' : '')};
	opacity: ${(props: ICardPriceTagProps) => (props.disabled ? '0.5' : '1')};
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		right: -10px;
		top: 10px;
	}
	.bg-logo > img {
		height: 100%;
		width: 100%;
		opacity: 0.05;
		pointer-events: none;
	}
	.tag-title {
		width: 90px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			width: 10px;
			height: 10px;
			margin-left: 6px;
			opacity: 0.6;
		}
	}
	.tag-title > a {
		margin: 0;
	}
	.tag-title > a,
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
		z-index: 99;
		text-decoration: none;
	}
	.tag-content {
		width: 220px;
		margin-left: 20px;
		margin-top: 6px;
		.tag-subtext {
			font-size: 18px;
			display: flex;
			flex-direction: row;
			color: ${ColorStyles.ThemeText};
		}
	}
	.tag-price {
		color: ${ColorStyles.ThemeTextAlpha};
		font-size: 14px;
		font-weight: 500;
	}
`;
export const SStakingRInfoBTN = styled.div`
	&:hover {
		color: rgba(0, 0, 0, .6);
		border-color:rgba(0, 0, 0, 0.4);
	}
	user-select: none;
	transition: all 0.3s;
	width: 84%;
	height: 18px;
	border-radius: 2px;
	font-size: 12px;
	line-height: 18px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.4);
	border: 1px solid rgba(0, 0, 0, 0.2);
	text-align: center;
	cursor: pointer !important;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SStakingButtonM = styled.div`
	&:hover {
		background: #ff5e5e;
	}
	user-select: none;
	transition: all 0.3s;
	width: 84px;
	height: 18px;
	border-radius: 9px;
	font-size: 12px;
	line-height: 18px;
	font-weight: 500;
	color: white;
	border: 1px solid #ff5e5e;
	background: #fc7676;
	text-align: center;
	cursor: pointer !important;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const SStakingButtonM2 = styled.div`
	&:hover {
		background: #ff5e5e;
	}
	user-select: none;
	transition: all 0.3s;
	width: 100%;
	height: 24px;
	border-radius: 13px;
	font-size: 14px;
	line-height: 24px;
	font-weight: 500;
	color: white;
	border: 1px solid #ff5e5e;
	background: #fc7676;
	text-align: center;
	cursor: pointer !important;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const SStakingButtonF = styled.div`
	&:hover {
		border: 1px solid #ff5e5e;
		color: #ff5e5e;
	}
	user-select: none;
	transition: all 0.3s;
	width: 100%;
	height: 26px;
	border-radius: 13px;
	font-size: 14px;
	line-height: 26px;
	font-weight: 500;
	color: #fc7676;
	border: 1px solid #fc7676;
	background: transparent;
	text-align: center;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const SStakingInput = styled.input`
	&::placeholder {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.3);
	}
	&:focus {
		box-shadow: 0 0 0 2px rgba(125, 196, 252, 0.8);
	}
	font-size: 12px;
	padding-left: 5px;
	outline: none;
	border: 1px solid rgba(180, 180, 180, 1);
	border-radius: 3px;
`;
export const SStakingInputM = styled.input`
	&::placeholder {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.3);
	}
	&:focus {
		box-shadow: 0 0 0 2px rgba(125, 196, 252, 0.8);
	}
	font-size: 14px;
	line-height: 24px;
	padding-left: 5px;
	height: 24px;
	outline: none;
	border: 1px solid rgba(180, 180, 180, 1);
	border-radius: 3px;
`;

export const SStakingRlink = styled.div`
	border: 1px dashed rgba(0, 0, 0, 0.3);
	color: rgba(0, 0, 0, 0.5);
	font-size: 14px;
	padding: 2px 5px;
	border-radius: 2px;
	line-height: 26px;
	width: 320px;
`;
export const SStakingRlinkM = styled.div`
	border: 1px dashed rgba(0, 0, 0, 0.3);
	color: rgba(0, 0, 0, 0.5);
	font-size: 14px;
	padding: 2px 5px;
	border-radius: 2px;
	line-height: 26px;
`;

export const SStakingSwitch = styled.div`
	cursor: pointer;
	border: 2px solid rgba(255, 255, 255, 0.8);
	border-radius: 15px;
	align-items: center;
	display: flex;
	justify-content: center;
	width: 130px;
	text-align: center;
	color: rgba(255, 255, 255, 1);
	font-size: 14px;
	font-weight: 500;
	height: 30px;
	line-height: 30px;
	opacity: 0.9;
	transition: all 0.2s;
	&:hover {
		opacity: 1;
		box-shadow: 0 0 5px 2px rgba(68, 124, 170, 0.5);
		background: rgba(200, 200, 200, 0.3);
	}
`;
export interface ICardAssetTagProps {
	mobile?: boolean;
	value?: number;
}

export const SCardAssetTag = styled.div`
	height: 100px;
	width: ${(props: ICardAssetTagProps) => (props.mobile ? '100%' : '165px')};
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderBlack3};
	overflow: hidden;
	padding-top: 10px;
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		right: ${(props: ICardAssetTagProps) => (props.mobile ? '-15px' : '-35px')};
		top: 10px;
	}
	.bg-logo > img {
		height: 100%;
		width: 100%;
		opacity: 0.05;
		pointer-events: none;
	}
	.tag-title {
		width: 90px;
		margin-left: 15px;
	}
	.tag-title > h3 {
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.ThemeTextAlpha};
		margin: 0;
	}
	.tag-content {
		width: 140px;
		margin-left: 15px;
		margin-top: 10px;
	}
	.tag-subtext {
		color: ${ColorStyles.ThemeTextAlpha};
		font-size: 10px;
	}
	.tag-price {
		color: ${ColorStyles.ThemeText};
		font-family: 'Roboto', 'Microsoft YaHei';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 18px;
	}
`;

export const SCardExtraDiv = styled.div`
	color: ${ColorStyles.TextWhiteAlpha};
	font-size: 10px;
	padding-right: 10px;
	line-height: 24px;
`;

export const SCardExtraDivSolid = styled.div`
	span {
		color: ${ColorStyles.TextWhiteAlphaL};
		font-size: 12px;
		padding-right: 10px;
		line-height: 24px;
		display: flex;
		flex-direction: row;
		align-items: center;
		img {
			margin-left: 4px;
			width: 10px;
			height: 10px;
		}
	}
`;

injectGlobal([
	`
	body {
		.ant-tooltip-placement-top .ant-tooltip-arrow {
			border-top-color: ${ColorStyles.CardBackgroundSolid};
		}
		.ant-tooltip-inner {
			max-width: 400px;
			border-radius: 2px;
			font-size: 10px;
			font-family: 'Roboto', 'Microsoft YaHei';
			background: ${ColorStyles.CardBackgroundSolid};
			box-shadow: 0 2px 5px 0 rgba(0,0,0,0.4);
			color: ${ColorStyles.ThemeText};
		}
		.ant-card-extra {
			padding: 0
		}
		.mobile-list-modal > .ant-modal-content > .ant-modal-body {
			padding: 12px !important;
		}
	}
`
] as any);

export interface ICardExtraProps {
	color?: string;
}

export const SCardExtendExtraDiv = styled.div`
	font-family: 'Roboto', 'Microsoft YaHei';
	color: ${ColorStyles.TextWhiteAlpha};
	font-size: 10px;
	padding-right: 10px;
	line-height: 24px;
	& > .extend-extra-wrapper {
		padding: 0 10px;
		border: 1px dashed;
		border-color: ${(props: ICardExtraProps) =>
			props.color ? ColorStyles.TextRedAlphaLL : ColorStyles.BorderWhite3};
		display: flex;
		flex-direction: row;
		.tag-content {
			text-decoration: none;
			color: ${(props: ICardExtraProps) =>
				props.color ? props.color : ColorStyles.TextWhiteAlphaL};
			overflow: hidden;
			display: flex;
			flex-direction: row-reverse;
			margin-left: 8px;
			max-width: 42px;
			transition: max-width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
			-webkit-transition: max-width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
		}
	}
	& > .extend-extra-wrapper:hover > .tag-content {
		margin-left: 8px;
		max-width: ${(props: ICardExtraProps) => (props.color ? '60px' : '300px')};
	}
`;

export const SCardRadioExtraDiv = styled.div`
	font-family: 'Roboto', 'Microsoft YaHei';
	color: ${ColorStyles.TextWhiteAlpha};
	font-size: 10px;
	line-height: 24px;
	& > .extend-extra-wrapper {
		display: flex;
		flex-direction: row;
	}
	& > .true {
		padding-right: 10px;
	}
	.ant-radio-group {
		font-size: 10px;
		font-weight: 400;
	}
`;

export const SRadioGroup = styled(RadioGroup as any)`
	margin-left: 8px;
	.ant-radio-button-wrapper:first-child,
	.ant-radio-button-wrapper:last-child {
		border-radius: 0;
	}
	.ant-radio-button-wrapper:last-child {
		border-left: 0;
	}
	.ant-radio-button-wrapper {
		padding: 0 12px;
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite2};
		color: ${ColorStyles.TextWhiteAlphaLLL};
		background: ${ColorStyles.ButtonRadioUnchekedBG};
	}
	.ant-radio-button-wrapper-checked {
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite10};
		color: ${ColorStyles.TextWhiteAlpha};
		background: ${ColorStyles.ButtonRadioChekedBG};
		box-shadow: ${() => '-1px 0 0 0 ' + ColorStyles.BorderWhite6};
	}
`;

export interface ICardListProps {
	noMargin?: boolean;
}
export const SCardList = styled.div`
	width: 100%;
	.status-list-wrapper {
		width: 100%;
	}
	.status-list-wrapper > ul:last-child {
		margin: ${(props: ICardListProps) => (props.noMargin ? '10px 0 0 0 !important' : '10px 0')};
	}
	.status-list-wrapper > ul {
		list-style: none;
		margin: 10px 0;
		padding: 10px 5px;
		border: 1px dashed;
		border-color: ${ColorStyles.BorderBlack3};
		li:nth-child(even) {
			background-color: ${ColorStyles.ListHighlight};
		}
		.no-bg {
			background-color: transparent !important;
			padding: 0 5px 0 3px;
			overflow: hidden;
			position: relative;
		}
		.block-title {
			font-weight: 600;
			color: ${ColorStyles.ThemeText};
			margin-bottom: 5px;
			.last-reset-title {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.last-reset-title-span {
					color: ${ColorStyles.ThemeTextAlpha};
					font-size: 10px;
				}
			}
		}
		.t-center {
			justify-content: center;
		}
		.no-borderbottom {
			border-bottom: none !important;
		}
		li {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 5px;
			align-items: center;
			border-bottom: 1px solid ${ColorStyles.BorderBlack1};
			.title {
				color: ${ColorStyles.ThemeTextAlpha};
			}
			.content {
				color: ${ColorStyles.ThemeText};
			}
			.percent-button {
				outline: none;
				cursor: pointer;
				font-family: 'Roboto', 'Microsoft YaHei';
				background-color: transparent;
				color: ${ColorStyles.ThemeTextAlpha};
				border: 1px dashed;
				border-color: ${ColorStyles.BorderBlack2};
				font-size: 10px;
				height: 24px;
				width: 40px;
				transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
			}
			.p_mobile {
				width: 22% !important;
				font-size: 9px !important;
			}
			.percent-button:hover {
				color: ${ColorStyles.ThemeText};
				border-color: ${ColorStyles.BorderBlack4};
				background-color: ${ColorStyles.ButtonHoverWhite1};
			}
			.align-right {
				width: 100%;
				color: ${ColorStyles.ThemeText};
				font-size: 12px;
				text-align: right;
			}
			.default-button {
				cursor: pointer;
				font-size: 10px;
				color: ${ColorStyles.ThemeText};
				border: 1px dashed;
				border-color: ${ColorStyles.BorderBlack2};
				padding: 0 5px;
				transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
			}
			.default-button:hover {
				color: ${ColorStyles.ThemeText};
				border-color: ${ColorStyles.BorderBlack4};
			}
		}
		li:last-child {
			border-bottom: none;
		}
		.input-line {
			padding: 5px 5px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 5px;
			transition: all 0.3s;
		}
		.input-disabled {
			pointer-events: none;
			opacity: 0.2 !important;
		}
		.description {
			width: 100%;
			height: 21px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: ${ColorStyles.ThemeTextAlpha};
			margin-bottom: 5px;
			font-size: 12px;
			img {
				width: 10px;
				height: 10px;
				opacity: 0.6;
			}
		}
		.img-line {
			width: 100%;
			height: 108px;
			display: flex;
			justify-content: center;
			align-items: center;
			.demo-img {
				height: 90%;
				opacity: 0.6;
			}
		}
	}
`;
export interface ICardListProgressBarProps {
	index: number;
	total: number;
}
export const SCardListProgressBar = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	.bar-bg {
		width: 285px;
		height: 12px;
		background: ${ColorStyles.CardBackgroundSolid};
		box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.6);
		border-radius: 6px;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 3px;
		padding-right: 3px;
		.inner-bar {
			position: relative;
			width: ${(props: ICardListProgressBarProps) =>
				(273 * props.index) / props.total + 6 + 'px'};
			height: 6px;
			background: ${ColorStyles.TextWhiteAlphaLL};
			box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
			border-radius: 3px;
		}
		.inner-bar:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-image: -webkit-gradient(
				linear,
				0 0,
				100% 100%,
				color-stop(0.25, rgba(0, 0, 0, 0.15)),
				color-stop(0.25, transparent),
				color-stop(0.5, transparent),
				color-stop(0.5, rgba(0, 0, 0, 0.15)),
				color-stop(0.75, rgba(0, 0, 0, 0.15)),
				color-stop(0.75, transparent),
				to(transparent)
			);
			z-index: 1;
			background-size: 60px 60px;
			animation: move 3s linear infinite;
			overflow: hidden;
			@keyframes move {
				0% {
					background-position: 0 0;
				}
				100% {
					background-position: 60px 60px;
				}
			}
		}
	}
	.bar-text {
		color: ${ColorStyles.TextWhiteAlpha};
	}
`;

export const SCardConversionForm = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.conv-button {
		outline: none;
		cursor: pointer;
		width: 180px;
		font-family: 'Roboto', 'Microsoft YaHei';
		background-color: transparent;
		color: ${ColorStyles.ThemeTextAlpha};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderBlack2};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.mobile {
		width: 46% !important;
	}
	.conv-button:hover {
		color: ${ColorStyles.ThemeText};
		border-color: ${ColorStyles.BorderBlack3};
		background-color: ${ColorStyles.LightHoverSolid};
	}
	.selected {
		height: 22px;
		border: 1px solid !important;
		border-color: ${ColorStyles.BorderBlack4} !important;
		color: ${ColorStyles.ThemeText} !important;
		background-color: 'transparent' !important;
	}
	.non-select {
		height: 22px;
	}
`;
injectGlobal([
	`
	body {
		.ant-popover-arrow {
			background: ${ColorStyles.CardBackgroundSolid};
		}
		.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow {
			bottom: 6px;
			box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
		}
		.ant-popover {
			font-family: 'Roboto', 'Microsoft YaHei';
		}
		.ant-popover-inner {
			background: ${ColorStyles.CardBackgroundSolid};
			box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
			border-radius: 0;
		}
		.ant-popover-inner-content {
			padding: 10px 10px;
		}
		.ant-popover-message {
			color: ${ColorStyles.ThemeText};
		}
		.ant-btn-sm {
			padding: 0 10px;
			font-size: 12px;
			border-radius: 0;
			border: 1px solid;
			border-color: ${ColorStyles.BorderBlack2};
			height: 20px;
			background: none;
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-btn-sm:hover {
			color: ${ColorStyles.ThemeText} !important;
			border-color: ${ColorStyles.BorderBlack4} !important;
			background-color: ${ColorStyles.LightHoverSolid} !important;
		}
		.ant-popover-buttons {
			margin-bottom: 0px;
		}
		.form-button {
			outline: none;
			cursor: pointer;
			width: 180px;
			font-family: 'Roboto', 'Microsoft YaHei';
			background-color: transparent;
			color: ${ColorStyles.ThemeTextAlpha};
			border: 1px solid;
			border-color: ${ColorStyles.BorderBlack2};
			transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
		}
		.form-button:disabled {
			pointer-events: none;
			opacity: 0.2 !important;
		}
		.form-button:hover {
			color: ${ColorStyles.ThemeText};
			border-color: ${ColorStyles.BorderBlack4};
			background-color: ${ColorStyles.LightHoverSolid};
		}
		.address-table-action-col {
			cursor: default !important;
		}
	}
`
] as any);

export const SCardTransactionForm = styled.div`
	width: 100%;
	margin-top: -10px;
	.token-button {
		outline: none;
		cursor: pointer;
		width: 80px;
		font-family: 'Roboto', 'Microsoft YaHei';
		font-size: 10px;
		background-color: transparent;
		color: ${ColorStyles.ThemeTextAlpha};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderBlack3};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.token-button:hover {
		color: ${ColorStyles.ThemeText};
		border-color: ${ColorStyles.BorderBlack3};
		background-color: ${ColorStyles.LightHoverSolid};
	}
	.trans-button {
		outline: none;
		cursor: pointer;
		width: 115px;
		font-family: 'Roboto', 'Microsoft YaHei';
		background-color: transparent;
		color: ${ColorStyles.ThemeTextAlpha};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderBlack3};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
		.superscript {
			margin-left: 2px;
			font-size: 12px;
		}
	}
	.trans-button:hover {
		color: ${ColorStyles.ThemeText};
		border-color: ${ColorStyles.BorderBlack3};
		background-color: ${ColorStyles.LightHoverSolid};
	}
	.selected {
		border: 1px solid !important;
		border-color: ${ColorStyles.BorderBlack3} !important;
		color: ${ColorStyles.ThemeText} !important;
		background-color: 'transparent' !important;
	}
	.wide {
		width: 175px !important;
	}
	.form-button {
		outline: none;
		cursor: pointer;
		width: 120px;
		font-family: 'Roboto', 'Microsoft YaHei';
		background-color: transparent;
		color: ${ColorStyles.ThemeText};
		border: 1px solid;
		border-color: ${ColorStyles.BorderBlack3};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.b_mobile {
		width: 30% !important;
	}
	.form-button:hover {
		color: ${ColorStyles.ThemeText};
		border-color: ${ColorStyles.BorderBlack4};
		background-color: ${ColorStyles.LightHoverSolid};
	}
	.form-button:disabled {
		pointer-events: none;
		opacity: 0.2 !important;
	}
	.remark {
		margin-top: 20px;
		font-size: 12px;
		padding: 0 10px;
		text-align: justify;
		color: ${ColorStyles.ThemeTextAlphaL};
	}
`;
export interface ISInputProps {
	width?: string;
	right?: boolean;
	small?: boolean;
}
export const SInput = styled.input`
	outline: none;
	font-size: ${(props: ISInputProps) => (props.small ? '9px' : '12px')};
	background: ${ColorStyles.CardBackgroundSolid};
	color: ${ColorStyles.ThemeText};
	border: 1px solid ${ColorStyles.BorderBlack3};
	width: ${(props: ISInputProps) => (props.width ? props.width : '160px')};
	height: 28px;
	padding: 0 8px;
	text-align: ${(props: ISInputProps) => (props.right ? 'right' : 'left')};
	transition: box-shadow 0.3s;
	&:focus {
		box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.1), 0 0 2px 2px rgba(255, 255, 255, 0.05);
	}
	&::placeholder {
		color: ${ColorStyles.ThemeTextAlphaL};
	}
	&.input-error {
		box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.1), 0 0 2px 2px rgba(255, 86, 86, 0.2) !important;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;

export const STableWrapper = styled.div`
	margin-top: 10px;
	thead > tr > th {
		background: 'transparent';
		color: ${ColorStyles.ThemeTextAlpha};
		border-bottom: 0;
	}
	tbody > tr:nth-child(even) > td {
		background: 'transparent';
	}
	tbody > tr:nth-child(odd) > td {
		background: transparent;
	}
	tbody > tr:hover > td {
		background: ${ColorStyles.HoverBackgroundSolid};
	}
	td {
		cursor: pointer;
		border-bottom: 0 !important;
		color: ${ColorStyles.ThemeTextAlpha};
	}
	tr > .eth,
	tr > .token-ab,
	tr > .fee {
		text-align: right;
	}
	tbody > tr > .fee {
		color: ${ColorStyles.TextRed};
	}
	.Redeem {
		.eth {
			color: ${ColorStyles.TextGreen};
		}
		.token-ab {
			color: ${ColorStyles.TextRed};
		}
	}
	.Create {
		.token-ab {
			color: ${ColorStyles.TextGreen};
		}
		.eth {
			color: ${ColorStyles.TextRed};
		}
	}
	.ant-table table {
		border: none;
		border-radius: 0;
	}
	.ant-table-placeholder {
		width: 100%;
		background: none !important;
		border-bottom: 1px solid;
		border-left: 1px solid;
		border-right: 1px solid;
		border-color: ${ColorStyles.BorderBlack1};
		border-radius: 0;
		color: ${ColorStyles.ThemeText};
	}
`;
injectGlobal([
	`
	body {
		.ant-table-thead > tr > th .anticon-filter {
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-table-thead > tr > th .anticon-filter:hover, .ant-table-thead > tr > th .ant-table-filter-icon:hover {
			color: ${ColorStyles.ThemeText};
		}
		.ant-table-thead > tr > th .ant-table-filter-selected.anticon-filter {
			color: ${ColorStyles.ThemeText};
		}
		.ant-table-column-sorter {
			color: ${ColorStyles.ThemeText};
		}
		.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
			padding: 10px 10px;
		}
		.ant-table-column-sorter-up:hover .anticon, .ant-table-column-sorter-down:hover .anticon {
			color: ${ColorStyles.ThemeText};
		}
		.ant-table-column-sorter-up.on .anticon-caret-up, .ant-table-column-sorter-down.on .anticon-caret-up, .ant-table-column-sorter-up.on .anticon-caret-down, .ant-table-column-sorter-down.on .anticon-caret-down {
			color: ${ColorStyles.ThemeText};
		}
		.ant-table-thead > tr > th.ant-table-column-sort {
			background: ${ColorStyles.ListHighlight};
		}
		.ant-table-thead > tr:first-child > th:first-child {
			border-top-left-radius: 0;
		}
		.ant-table-filter-dropdown {
			border-radius: 0;
			background: ${ColorStyles.CardBackgroundSolid};
		}
		.ant-table-filter-dropdown > ul > li:hover {
			background: ${ColorStyles.LightHoverSolid} !important;
		}
		.ant-table-filter-dropdown-btns {
			border-top: 1px dashed;
			border-color: ${ColorStyles.BorderBlack3};
		}
		.ant-table-filter-dropdown-link {
			font-family: "Roboto";
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-table-filter-dropdown-link:hover {
			color: ${ColorStyles.ThemeText};
		}
		.ant-dropdown-menu-item {
			font-family: "Roboto";
			color: ${ColorStyles.ThemeTextAlpha};
			padding: 5px 10px 5px 5px;
		}
		.ant-radio {
			width: 0px;
			overflow: hidden;
		}
		.ant-dropdown-menu-item:hover {
			background: ${ColorStyles.HoverBackgroundSolid};
		}
		.ant-dropdown-menu {
			background: ${ColorStyles.CardBackgroundSolid};
		}
		.ant-select-dropdown-menu-item-selected {
			width: 100%;
		}
		.ant-pagination-total-text {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-item {
			background: transparent;
			border: 1px solid;
			border-radius: 0;
		}
		.ant-pagination-item-active:focus, .ant-pagination-item-active:hover {
			border-color: ${ColorStyles.BorderBlack3};
		}
		.ant-pagination-item-active {
			border-color: ${ColorStyles.BorderBlack3};
		}
		.ant-pagination-item a {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-item-active a, .ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a, .ant-pagination-item:focus a, .ant-pagination-item:hover a {
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-pagination-disabled a, .ant-pagination-disabled:hover a, .ant-pagination-disabled:focus a, .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus .ant-pagination-item-link {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-prev a, .ant-pagination-next a {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-select-selection {
			font-size: 12px;
			color: ${ColorStyles.ThemeText};
			border-radius: 0;
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite1};
			background: transparent;
		}
		.ant-select-arrow, .ant-pagination-options-quick-jumper {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-options-quick-jumper input {
			color: ${ColorStyles.ThemeTextAlphaL};
			background-color: transparent;
			background-image: none;
			border: 1px solid;
			border-color: ${ColorStyles.BorderBlack3};
			border-radius: 0;
		}
		.ant-pagination-options-quick-jumper input:focus {
			-webkit-box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
			box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
			border-color: ${ColorStyles.BorderBlack3};
		}
		.ant-pagination-options-quick-jumper input:hover {
			border-color: ${ColorStyles.BorderBlack3};
		}
		.ant-pagination-jump-prev:after, .ant-pagination-jump-next:after {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-pagination-jump-prev:focus:after, .ant-pagination-jump-next:focus:after, .ant-pagination-jump-prev:hover:after, .ant-pagination-jump-next:hover:after {
			color: ${ColorStyles.ThemeTextAlpha};
		}
		.ant-select-selection:hover, .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
			border-color: ${ColorStyles.BorderWhite6};
		}
		.ant-select-open, .ant-select-selection {
			box-shadow: none !important;
		}
		.ant-select-dropdown-menu-item-active {
			background: ${ColorStyles.SelectBackgroundSolid};
			font-weight: 500;
		}
		.ant-dropdown-menu-item-selected, .ant-dropdown-menu-submenu-title-selected, .ant-dropdown-menu-item-selected > a, .ant-dropdown-menu-submenu-title-selected > a {
			background: ${ColorStyles.SelectBackgroundSolid};
		}
		.admin-table-row > td {
			cursor: default !important;
		}
		.ant-btn.disabled, .ant-btn[disabled], .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn.disabled.active, .ant-btn[disabled].active {
			color: ${ColorStyles.ThemeTextAlphaL};
		}
		.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:hover {
			background: ${ColorStyles.ListHighlight};
		}
		.ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .anticon-filter:hover, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .ant-table-filter-icon:hover {
			background: ${ColorStyles.ListHighlight};
			color: ${ColorStyles.ThemeTextAlpha}
		}
		.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
			background: ${ColorStyles.LightHoverSolid};
		}
		.lastRoundRow {
			pointer-events: none !important;
		}
	}
`
] as any);

export const SChartWrapper = styled.div`
	width: 760px;
	height: 350px;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderWhite1};
`;

export const SRefreshButton = styled(Button as any)`
	color: ${ColorStyles.TextWhiteAlphaL};
	border: none !important;
	background: transparent !important;
	&:hover {
		color: ${ColorStyles.TextWhite};
	}
	&:focus {
		color: ${ColorStyles.TextWhiteAlphaL};
	}
	&:after {
		border: 0 solid ${ColorStyles.BorderWhite5};
	}
	&:disabled {
		color: ${ColorStyles.TextWhiteAlphaLLL};
	}
`;
