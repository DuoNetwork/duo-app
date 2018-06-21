import { Card, Radio, Select } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import { ColorStyles } from '../../common/styles';

const RadioGroup = Radio.Group;

export interface ICardProps {
	width?: string;
	margin?: string;
	inlinetype?: string;
}

export const SCard = styled(Card)`
	overflow: hidden;
	width: ${(props: ICardProps) => props.width};
	margin: ${(props: ICardProps) => props.margin};
	display: ${(props: ICardProps) => (props.inlinetype ? 'inline-table' : '')};
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
		.card-disable {
			pointer-events: none !important;
			opacity: 0.5;
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
	width: 155px;
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
		color: ${ColorStyles.TextTokenA};
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.tag-price-2 {
		color: ${ColorStyles.TextTokenB};
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
	width: 140px;
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
		width: 140px;
		margin-left: 15px;
		margin-top: 10px;
	}
	.tag-subtext {
		color: ${ColorStyles.TextWhiteAlphaL};
		font-size: 10px;
	}
	.tag-price {
		color: ${ColorStyles.TextWhiteAlpha};
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 18px;
	}
`;

export const SCardExtraDiv = styled.div`
	color: ${ColorStyles.TextWhiteAlphaLL};
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
			border-radius: 0;
			font-size: 12px;
			font-family: 'Roboto';
			background: ${ColorStyles.CardBackgroundSolid};
			box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
			color: ${ColorStyles.TextWhiteAlpha};
		}
	}
`
] as any);

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
	font-family: 'Roboto';
	color: ${ColorStyles.TextWhiteAlphaLL};
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
	}
	.status-list-wrapper > ul {
		list-style: none;
		margin: 10px 0;
		padding: 10px 5px;
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite1};
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
			font-weight: 500;
			color: ${ColorStyles.TextWhiteAlphaL};
			margin-bottom: 5px;
			.last-reset-title {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.last-reset-title-span {
					color: ${ColorStyles.TextWhiteAlphaLL};
					font-size: 10px;
				}
			}
		}
		li {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 5px;
			.title {
				color: ${ColorStyles.TextWhiteAlphaL};
			}
			.content {
				color: ${ColorStyles.TextWhiteAlpha};
			}
			.percent-button {
				outline: none;
				cursor: pointer;
				font-family: 'Roboto';
				background-color: transparent;
				color: ${ColorStyles.TextWhiteAlphaLL};
				border: 1px dashed;
				border-color: ${ColorStyles.BorderWhite2};
				font-size: 10px;
				height: 24px;
				width: 40px;
				transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
			}
			.percent-button:hover {
				color: ${ColorStyles.TextWhiteAlphaL};
				border-color: ${ColorStyles.BorderWhite4};
				background-color: ${ColorStyles.ButtonHoverWhite1};
			}
			.align-right {
				width: 100%;
				color: ${ColorStyles.TextWhiteAlphaLL};
				font-size: 12px;
				text-align: right;
			}
			.default-button {
				cursor: pointer;
				font-size: 10px;
				color: ${ColorStyles.TextWhiteAlphaLL};
				border: 1px dashed;
				border-color: ${ColorStyles.BorderWhite2};
				padding: 0 5px;
				transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
			}
			.default-button:hover {
				color: ${ColorStyles.TextWhiteAlpha};
				border-color: ${ColorStyles.BorderWhite6};
			}
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
			color: ${ColorStyles.TextWhiteAlphaL};
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
		font-family: 'Roboto';
		background-color: transparent;
		color: ${ColorStyles.TextWhiteAlphaLL};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite2};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.conv-button:hover {
		color: ${ColorStyles.TextWhiteAlphaL};
		border-color: ${ColorStyles.BorderWhite4};
		background-color: ${ColorStyles.ButtonHoverWhite1};
	}
	.selected {
		border: 1px solid !important;
		border-color: ${ColorStyles.BorderWhite6} !important;
		color: ${ColorStyles.TextWhiteAlpha} !important;
		background-color: ${ColorStyles.ButtonHoverWhite1} !important;
	}
	.form-button {
		outline: none;
		cursor: pointer;
		width: 180px;
		font-family: 'Roboto';
		background-color: transparent;
		color: ${ColorStyles.TextWhiteAlphaL};
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite4};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.form-button:disabled {
		pointer-events: none;
		opacity: 0.2 !important;
	}
	.form-button:hover {
		color: ${ColorStyles.TextWhiteAlpha};
		border-color: ${ColorStyles.BorderWhite6};
		background-color: ${ColorStyles.ButtonHoverWhite1};
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
			font-family: 'Roboto';
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
			color: ${ColorStyles.TextWhiteAlpha};
		}
		.ant-btn-sm {
			padding: 0 10px;
			font-size: 12px;
			border-radius: 0;
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite4};
			height: 20px;
			background: none;
			color: ${ColorStyles.TextWhiteAlphaL};
		}
		.ant-btn-sm:hover {
			color: ${ColorStyles.TextWhiteAlpha} !important;
			border-color: ${ColorStyles.BorderWhite6} !important;
			background-color: ${ColorStyles.ButtonHoverWhite1} !important;
		}
		.ant-popover-buttons {
			margin-bottom: 0px;
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
		width: 60px;
		font-family: 'Roboto';
		font-size: 10px;
		background-color: transparent;
		color: ${ColorStyles.TextWhiteAlphaLL};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite2};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.token-button:hover {
		color: ${ColorStyles.TextWhiteAlphaL};
		border-color: ${ColorStyles.BorderWhite4};
		background-color: ${ColorStyles.ButtonHoverWhite1};
	}
	.trans-button {
		outline: none;
		cursor: pointer;
		width: 115px;
		font-family: 'Roboto';
		background-color: transparent;
		color: ${ColorStyles.TextWhiteAlphaLL};
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite2};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
		.superscript {
			margin-left: 2px;
			font-size: 12px;
		}
	}
	.trans-button:hover {
		color: ${ColorStyles.TextWhiteAlphaL};
		border-color: ${ColorStyles.BorderWhite4};
		background-color: ${ColorStyles.ButtonHoverWhite1};
	}
	.selected {
		border: 1px solid !important;
		border-color: ${ColorStyles.BorderWhite6} !important;
		color: ${ColorStyles.TextWhiteAlpha} !important;
		background-color: ${ColorStyles.ButtonHoverWhite1} !important;
	}
	.wide {
		width: 175px !important;
	}
	.form-button {
		outline: none;
		cursor: pointer;
		width: 120px;
		font-family: 'Roboto';
		background-color: transparent;
		color: ${ColorStyles.TextWhiteAlphaL};
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite4};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
	}
	.form-button:hover {
		color: ${ColorStyles.TextWhiteAlpha};
		border-color: ${ColorStyles.BorderWhite6};
		background-color: ${ColorStyles.ButtonHoverWhite1};
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
		color: ${ColorStyles.TextWhiteAlphaLL};
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
	box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.4);
	color: ${ColorStyles.TextWhiteAlpha};
	border: none;
	width: ${(props: ISInputProps) => (props.width ? props.width : '160px')};
	height: 28px;
	padding: 0 8px;
	text-align: ${(props: ISInputProps) => (props.right ? 'right' : 'left')};
	transition: all 0.3s;
	&:focus {
		box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.4), 0 0 2px 2px rgba(255, 255, 255, 0.05);
	}
	&::placeholder {
		color: ${ColorStyles.TextWhiteAlphaLLL};
	}
	&.input-error {
		box-shadow: inset 0 1px 6px 0px rgba(0, 0, 0, 0.4), 0 0 2px 2px rgba(255, 86, 86, 0.2) !important;
	}
`;

export const STableWrapper = styled.div`
	margin-top: 10px;
	thead > tr > th {
		background: ${ColorStyles.ListHighlight};
		color: ${ColorStyles.TextWhiteAlphaL};
		border-bottom: 0;
	}
	tbody > tr:nth-child(even) > td {
		background: ${ColorStyles.ListHighlight};
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
		color: ${ColorStyles.TextWhiteAlphaL};
	}
	tr > .eth,
	tr > .token-ab,
	tr > .fee {
		text-align: right;
	}
	tbody > tr > .fee {
		color: ${ColorStyles.TextRedAlpha};
	}
	.Redeem {
		.eth {
			color: ${ColorStyles.TextGreenAlpha};
		}
		.token-ab {
			color: ${ColorStyles.TextRedAlpha};
		}
	}
	.Create {
		.token-ab {
			color: ${ColorStyles.TextGreenAlpha};
		}
		.eth {
			color: ${ColorStyles.TextRedAlpha};
		}
	}
	.ant-table table {
		border: 1px dashed;
		border-color: ${ColorStyles.BorderWhite1};
		border-radius: 0;
	}
	.ant-table-placeholder {
		width: 708px;
		background: none !important;
		border-bottom: 1px dashed;
		border-left: 1px dashed;
		border-right: 1px dashed;
		border-color: ${ColorStyles.BorderWhite1};
		border-radius: 0;
		color: ${ColorStyles.TextWhiteAlphaLL};
	}
`;
injectGlobal([
	`
	body {
		.ant-table-thead > tr > th .anticon-filter {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-table-thead > tr > th .anticon-filter:hover, .ant-table-thead > tr > th .ant-table-filter-icon:hover {
			color: ${ColorStyles.TextWhiteAlpha};
		}
		.ant-table-thead > tr > th .ant-table-filter-selected.anticon-filter {
			color: ${ColorStyles.TextWhiteAlpha};
		}
		.ant-table-column-sorter {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
			padding: 10px 10px;
		}
		.ant-table-column-sorter-up:hover .anticon, .ant-table-column-sorter-down:hover .anticon {
			color: ${ColorStyles.TextWhiteAlpha};
		}
		.ant-table-column-sorter-up.on .anticon-caret-up, .ant-table-column-sorter-down.on .anticon-caret-up, .ant-table-column-sorter-up.on .anticon-caret-down, .ant-table-column-sorter-down.on .anticon-caret-down {
			color: ${ColorStyles.TextWhiteAlpha};
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
		.ant-table-filter-dropdown-btns {
			border-top: 1px dashed;
			border-color: ${ColorStyles.BorderWhite1};
		}
		.ant-table-filter-dropdown-link {
			font-family: "Roboto";
			color: ${ColorStyles.TextWhiteAlphaL};
		}
		.ant-table-filter-dropdown-link:hover {
			color: ${ColorStyles.TextWhiteAlpha};
		}
		.ant-dropdown-menu-item {
			font-family: "Roboto";
			color: ${ColorStyles.TextWhiteAlphaL};
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
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-pagination-item {
			background: transparent;
			border: 1px solid;
			border-radius: 0;
		}
		.ant-pagination-item-active:focus, .ant-pagination-item-active:hover {
			border-color: ${ColorStyles.BorderWhite3};
		}
		.ant-pagination-item-active {
			border-color: ${ColorStyles.BorderWhite3};
		}
		.ant-pagination-item a {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-pagination-item-active a, .ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a, .ant-pagination-item:focus a, .ant-pagination-item:hover a {
			color: ${ColorStyles.TextWhiteAlphaL};
		}
		.ant-pagination-disabled a, .ant-pagination-disabled:hover a, .ant-pagination-disabled:focus a, .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus .ant-pagination-item-link {
			color: ${ColorStyles.TextWhiteAlphaLLL};
		}
		.ant-pagination-prev a, .ant-pagination-next a {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
			color: ${ColorStyles.TextWhiteAlphaL};
		}
		.ant-select-selection {
			font-size: 12px;
			color: ${ColorStyles.TextWhiteAlphaLL};
			border-radius: 0;
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite1};
			background: transparent;
		}
		.ant-select-arrow, .ant-pagination-options-quick-jumper {
			color: ${ColorStyles.TextWhiteAlphaLL};
		}
		.ant-pagination-options-quick-jumper input {
			color: ${ColorStyles.TextWhiteAlphaLL};
			background-color: transparent;
			background-image: none;
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite1};
			border-radius: 0;
		}
		.ant-pagination-options-quick-jumper input:focus {
			-webkit-box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
			box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);
			border-color: ${ColorStyles.BorderWhite3};
		}
		.ant-pagination-options-quick-jumper input:hover {
			border-color: ${ColorStyles.BorderWhite3};
		}
		.ant-select-selection:hover, .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
			border-color: ${ColorStyles.BorderWhite3};
		}
		.ant-select-open, .ant-select-selection {
			box-shadow: none !important;
		}
		.ant-select-dropdown-menu-item-active {
			background: ${ColorStyles.SelectBackgroundSolid};
			font-weight: 500;
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
