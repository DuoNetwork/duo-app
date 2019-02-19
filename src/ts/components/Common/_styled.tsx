import { Menu, Modal } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import { ColorStyles } from '../../common/styles';

export const SMenu = styled(Menu)`
	background: ${ColorStyles.CardBackgroundSolid};
	padding: 0;
	border-radius: 0;
`;

export const SItem = styled(Menu.Item)`
	display: flex;
	flex-direction: row;
	align-items: center;
	color: ${ColorStyles.TextWhiteAlphaLL};
	font-size: 10px;
	font-weight: 400;
	font-family: 'Roboto', 'Microsoft YaHei';
	padding: 5px 10px;
	.picker-box {
		width: 12px;
		height: 12px;
		border: 1px solid;
		border-color: ${ColorStyles.BorderWhite4};
		margin-right: 5px;
	}
	&:hover {
		background: ${ColorStyles.HoverBackgroundSolid};
	}
`;

export const SModal = styled(Modal as any)`
	color: ${ColorStyles.ThemeTextAlpha};
	.ant-modal-content {
		border-radius: 0;
		background: ${ColorStyles.CardBackgroundSolid};
	}
	.ant-modal-header {
		border-radius: 0;
		background: transparent;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.ant-modal-footer {
		border-radius: 0;
		background: transparent;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
	.ant-modal-title {
		color: ${ColorStyles.ThemeTextAlpha};
	}
	.ant-modal-close {
		color: ${ColorStyles.ThemeTextAlphaL};
	}
	.ant-modal-close:focus,
	.ant-modal-close:hover {
		color: ${ColorStyles.ThemeTextAlpha};
	}
`;

injectGlobal([
	`
	body {
		.ant-dropdown-menu-item-selected {
			color: ${ColorStyles.TextWhiteAlpha};
			background: ${ColorStyles.SelectBackgroundSolid};
			font-weight: 500;
		}
		.check-icon {
			display: block;
			color: ${ColorStyles.TextWhiteAlphaL};
		}
		.card-source-button {
			margin-left: 10px;
			width: 80px;
			height: 24px;
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite1};
			font-size: 10px;
			color: ${ColorStyles.TextWhiteAlphaL};
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px;
			letter-spacing: 0;
			font-weight: 400;
		}
		.ant-dropdown-trigger .anticon-down {
			color: ${ColorStyles.TextWhiteAlphaLLL};
		}
		.ant-btn {
			border-radius: 0;
			line-height: 14px;
		}
		.ant-btn:before {
			background: ${ColorStyles.BorderBlack2};
		}
		.ant-btn-ghost {
			background-color: transparent;
			color: ${ColorStyles.ThemeTextAlpha};
			border: 1px solid;
			border-color: ${ColorStyles.BorderBlack2};
			transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
		}
		.ant-btn-ghost:hover, .ant-btn-ghost:focus {
			color: ${ColorStyles.ThemeText};
			border-color: ${ColorStyles.BorderBlack4};
			background-color: ${ColorStyles.LightHoverSolid};
		}
		.ledger-account-selector > .ant-radio-wrapper {
			color: ${ColorStyles.ThemeTextAlpha};
			width: 100%;
			padding: 2px 0;
		}
		.ledger-account-selector > .ant-radio-wrapper:nth-child(odd) {
			background: transparent;
		}
		.ledger-account-selector > .ant-radio-wrapper:hover {
			background: ${ColorStyles.LightHoverSolid};
		}
		.ledger-account-selector > .ant-radio-wrapper-checked {
			background: ${ColorStyles.SelectBackgroundSolid} !important;
			box-shadow:inset 0px 0px 0px 1px ${ColorStyles.BorderBlack3};
		}
		.locale-select {
			display: flex;
			align-items: center;
			margin-left: 10px;
			.ant-select-selection-selected-value {
				width: 72px;
			}
		}
		.locale-img {
			width: 14px;
			height: 14px;
			margin-right: 2px;
		}
	}
`
] as any);
