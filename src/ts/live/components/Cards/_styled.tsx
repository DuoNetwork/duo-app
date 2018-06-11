import { Card, Radio, Select } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import { ColorStyles } from '../../common/styles';

const RadioGroup = Radio.Group;

export interface ICardProps {
	width?: string;
	margin?: string;
	// center?: boolean;
	// horizontal?: boolean;
	// padding?: string;
	// paddingLeft?: string;
	// paddingRight?: string;
	// paddingTop?: string;
	// paddingBottom?: string;
}

export const SCard = styled(Card)`
	overflow: hidden;
	width: ${(props: ICardProps) => props.width};
	margin: ${(props: ICardProps) => props.margin};
	background: ${ColorStyles.CardBackground};
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
	border-radius: 0px;
	border: none !important;
	& > .ant-card-head {
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
		.ant-card-wider-padding .ant-card-head{
			padding: 0 16px;
		}
		.ant-card-wider-padding .ant-card-body{
			padding: 0px 16px 16px 16px;
		}
		.ant-card-head-wrapper {
			border-bottom: 1px solid rgba(255,255,255,.05);
		}
	}
`
] as any);

export const SCardTitle = styled.div`
	color: ${ColorStyles.TextWhiteAlpha};
	font-family: 'Roboto';
	font-weight: 500;
	letter-spacing: 2px;
	font-size: 18px;
	padding-left: 12px;
`;

export const SCardTitleSelector = styled(Select)`
	.ant-select-selection {
		border-radius: 0;
		color: ${ColorStyles.TextWhiteAlphaL};
		background-color: transparent;
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite1};
		font-size: 10px;
		font-family: 'Roboto';
		font-weight: 400;
		letter-spacing: 0;
		span {
			color: ${ColorStyles.TextWhiteAlphaLLL};
		}
	}
	.ant-select-selection:focus {
		-webkit-box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
	}
`;

injectGlobal([
	`
	body {
		.ant-select-dropdown {
			border-radius: 0;
			font-size: 10px;
			font-family: 'Roboto';
			background: ${ColorStyles.CardBackgroundSolid};
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

export const SCardPriceTag = styled.div`
	height: 100px;
	width: 160px;
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderWhite1};
	overflow: hidden;
	padding-top: 10px;
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		left: -35px;
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
	}
	.tag-title > h3 {
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.TextWhiteAlphaL};
		margin: 0;
	}
	.tag-content {
		width: 120px;
		margin-left: 20px;
		margin-top: 10px;
	}
	.tag-price {
		color: white;
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 24px;
	}
	.tag-unit {
		margin-left: 2px;
		color: ${ColorStyles.TextWhiteAlphaL};
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		margin-top: 11px;
	}
	.tag-price-1 {
		color: #69bcff;
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: #f9ae32;
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-3 {
		color: white;
		font-family: 'Roboto';
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
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 4px;
	}
	.tag-unit-3 {
		color: ${ColorStyles.TextWhiteAlphaL};
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;

export interface ICardAssetTagProps {
	value: number;
}

export const SCardAssetTag = styled.div`
	height: 100px;
	width: 115px;
	position: relative;
	margin-top: 10px;
	border: 1px dashed;
	border-color: ${ColorStyles.BorderWhite1};
	overflow: hidden;
	padding-top: 10px;
	.bg-logo {
		height: 100px;
		width: 100px;
		position: absolute;
		left: -35px;
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
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 12px;
		color: ${ColorStyles.TextWhiteAlphaL};
		margin: 0;
	}
	.tag-content {
		width: 120px;
		margin-left: 15px;
		margin-top: 15px;
	}
	.tag-price {
		color: white;
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: ${(props: ICardAssetTagProps) => (props.value >= 9999999.99 ? '11px' : '14px')};
	}
`;

export const SCardExtraDiv = styled.div`
	color: ${ColorStyles.TextWhiteAlphaLL};
	font-size: 10px;
	padding-right: 10px;
	line-height: 24px;
`;

export const SCardExtraDivSolid = styled.div`
	color: ${ColorStyles.TextWhiteAlphaL};
	font-size: 14px;
	padding-right: 10px;
	line-height: 24px;
	display: flex;
	flex-direction: row;
	align-items: center;
	img {
		margin-left: 5px;
		width: 12px;
		height: 12px;
		opacity: 0.8;
	}
`;

export interface ICardExtraProps {
	color?: string;
}

export const SCardExtendExtraDiv = styled.div`
	font-family: 'Roboto';
	color: ${ColorStyles.TextWhiteAlphaLL};
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
			color: ${(props: ICardExtraProps) =>
				props.color ? props.color : ColorStyles.TextWhiteAlphaL};
			overflow: hidden;
			padding-left: 0px;
			max-width: 0px;
			transition: max-width 0.3s ease-in-out, padding-left 0.3s ease-in-out;
			-webkit-transition: max-width 0.3s ease-in-out, padding-left 0.3s ease-in-out;
		}
	}
	& > .extend-extra-wrapper:hover > .tag-content {
		padding-left: 8px;
		max-width: ${(props: ICardExtraProps) => (props.color ? '60px' : '300px')};
	}
`;

export const SCardRadioExtraDiv = styled.div`
	font-family: 'Roboto';
	color: ${ColorStyles.TextWhiteAlphaLL};
	font-size: 10px;
	padding-right: 10px;
	line-height: 24px;
	& > .extend-extra-wrapper {
		padding: 0 10px;
		display: flex;
		flex-direction: row;
	}
`;

export const SRadioGroup = styled(RadioGroup)`
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
		border-color: ${ColorStyles.BorderWhite4};
		color: ${ColorStyles.TextWhiteAlphaL};
		background: ${ColorStyles.ButtonRadioChekedBG};
		box-shadow: ${() => '-1px 0 0 0 ' + ColorStyles.BorderWhite6};
	}
`;

export const SCardList = styled.ul`
	height: 400px;
	list-style: none;
	margin: 10px 0;
	padding: 0;
	li {
		.title {
			color: ${ColorStyles.TextWhiteAlphaL}
		}
		.content {
			color: ${ColorStyles.TextWhiteAlpha}
		}
	}
`;
