import { Menu } from 'antd';
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
	font-family: 'Roboto';
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
	}
`
] as any);
