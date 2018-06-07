import { Card } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import { ColorStyles } from '../../common/styles';

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
	box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
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

injectGlobal([`
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
`] as any);

export const SCardTitle = styled.div`
	color: rgba(250, 250, 250, 0.8);
	font-family: 'Roboto';
	font-weight: 500;
	letter-spacing: 2px;
	font-size: 18px;
	padding-left: 12px;
`;

export const SCardPriceTag = styled.div`
	height: 100px;
	width: 160px;
	position: relative;
	margin-top: 10px;
	border: 1px dashed rgba(255,255,255,.08);
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
		color: rgba(250, 250, 250, 0.6);
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
		color: rgba(250, 250, 250, 0.6);
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
		color: rgba(250, 250, 250, 0.6);
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
		margin-top: 6px;
	}
	.tag-unit-3 {
		color: rgba(250, 250, 250, 0.6);
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 10px;
	}
`;

export const SCardAssetTag = styled.div`
	height: 100px;
	width: 115px;
	position: relative;
	margin-top: 10px;
	border: 1px dashed rgba(255,255,255,.08);
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
		color: rgba(250, 250, 250, 0.6);
		margin: 0;
	}
	.tag-content {
		width: 120px;
		margin-left: 20px;
		margin-top: 15px;
	}
	.tag-price {
		color: white;
		font-family: 'Roboto';
		font-weight: 500;
		letter-spacing: 1px;
		font-size: 14px;
	}
`;

export const SCardExtraDiv = styled.div`
	color: ${ColorStyles.TextWhiteAlphaLL};
	font-size: 10px;
	padding-right: 10px;
	line-height: 24px;
`;
