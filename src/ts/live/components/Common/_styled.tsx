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
	font-family: 'Roboto', 'Yahei';
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

export const SModal = styled(Modal)`
	color: ${ColorStyles.TextWhiteAlpha};
	.ant-modal-content {
		border-radius: 0;
		background: ${ColorStyles.CardBackgroundDarkSolid};
	}
	.ant-modal-header {
		border-radius: 0;
		background: transparent;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}
	.ant-modal-footer {
		border-radius: 0;
		background: transparent;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}
	.ant-modal-title {
		color: ${ColorStyles.TextWhiteAlpha};
	}
	.ant-modal-close {
		color: ${ColorStyles.TextWhiteAlphaLL};
	}
	.ant-modal-close:focus,
	.ant-modal-close:hover {
		color: ${ColorStyles.TextWhiteAlphaL};
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
			background: ${ColorStyles.BorderWhite2};
		}
		.ant-btn-ghost {
			background-color: transparent;
			color: ${ColorStyles.TextWhiteAlphaL};
			border: 1px solid;
			border-color: ${ColorStyles.BorderWhite4};
			transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
		}
		.ant-btn-ghost:hover, .ant-btn-ghost:focus {
			color: ${ColorStyles.TextWhiteAlpha};
			border-color: ${ColorStyles.BorderWhite6};
			background-color: ${ColorStyles.ButtonHoverWhite1};
		}
		.ant-radio-wrapper {
			color: ${ColorStyles.TextWhiteAlphaL};
			width: 100%;
			padding: 2px 0;
		}
		.ant-radio-wrapper:nth-child(odd) {
			background: ${ColorStyles.ListHighlight};
		}
		.ant-radio-wrapper:hover {
			background: ${ColorStyles.HoverBackgroundSolid};
		}
		.ant-radio-wrapper-checked {
			background: ${ColorStyles.SelectBackgroundSolid} !important;
			box-shadow:inset 0px 0px 0px 1px ${ColorStyles.BorderWhite3};
		}
	}
`
] as any);
