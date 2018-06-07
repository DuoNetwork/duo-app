import { Layout } from 'antd';
import styled from 'styled-components';
import { ColorStyles } from '../common/styles';

const { Header, Content } = Layout;

export interface IDivFlexCenterProps {
	width?: string;
	height?: string;
	center?: boolean;
	horizontal?: boolean;
	marginBottom?: string;
	padding?: string;
	paddingLeft?: string;
	paddingRight?: string;
	paddingTop?: string;
	paddingBottom?: string;
}

export const SHeader = styled(Header)`
	width: 100% !important;
	margin-bottom: 20px;
	box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	background: ${ColorStyles.HeaderBackground} !important;
	color: ${ColorStyles.TextWhiteAlpha} !important;
`;

export const SContent = styled(Content)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SDivFlexCenter = styled.div`
	display: flex;
	width: ${(props: IDivFlexCenterProps) => props.width};
	height: ${(props: IDivFlexCenterProps) => props.height};
	flex-direction: ${(props: IDivFlexCenterProps) => (props.horizontal ? 'row' : 'column')};
	justify-content: ${(props: IDivFlexCenterProps) => (props.center ? 'center' : 'space-between')};
	padding: ${(props: IDivFlexCenterProps) => (props.padding)};
	padding-left: ${(props: IDivFlexCenterProps) => (props.padding ? null : props.paddingLeft)};
	padding-right: ${(props: IDivFlexCenterProps) => (props.padding ? null : props.paddingRight)};
	padding-top: ${(props: IDivFlexCenterProps) => (props.padding ? null : props.paddingTop)};
	padding-bottom: ${(props: IDivFlexCenterProps) => (props.padding ? null : props.paddingBottom)};
	margin-bottom: ${(props: IDivFlexCenterProps) => (props.marginBottom)};
`;
