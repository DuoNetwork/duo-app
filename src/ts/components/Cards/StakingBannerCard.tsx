import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
import banner1cn from 'images/banners/banner1cn.jpg';
import banner1en from 'images/banners/banner1en.jpg';
import banner2cn from 'images/banners/banner2cn.jpg';
import banner2en from 'images/banners/banner2en.jpg';
import banner3cn from 'images/banners/banner3cn.jpg';
import banner3en from 'images/banners/banner3en.jpg';
import * as React from 'react';

interface IProps {
	locale: string;
}
export default class StakingInfoCard extends React.Component<IProps> {
	public render() {
		const {
			locale
		} = this.props;
		return (
			<div>
				<BannerAnim autoPlay prefixCls="banner-user">
					<Element
						key="aaa"
						prefixCls="banner-user-elem"
						// onClick={() => window.open('https://duo.network', '_blank')}
					>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${locale === 'EN' ? banner1en : banner1cn})`
							}}
						/>
					</Element>

					<Element
						key="bbb"
						prefixCls="banner-user-elem"
					>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${locale === 'EN' ? banner2en : banner2cn})`
							}}
						/>
					</Element>
					<Element
						key="ccc"
						prefixCls="banner-user-elem"
					>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${locale === 'EN' ? banner3en : banner3cn})`
							}}
						/>
					</Element>
				</BannerAnim>
			</div>
		);
	}
}
