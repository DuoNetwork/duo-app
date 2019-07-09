import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
import banner1 from 'images/banners/banner1.jpg';
import banner2 from 'images/banners/banner2.jpg';
import banner3 from 'images/banners/banner3.jpg';
import * as React from 'react';

export default class StakingInfoCard extends React.Component {
	public render() {
		return (
			<div>
				<BannerAnim autoPlay prefixCls="banner-user">
					<Element key="aaa" prefixCls="banner-user-elem" onClick={() => window.open('https://duo.network', '_blank')}>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${banner1})`
							}}
						/>
					</Element>

					<Element key="bbb" prefixCls="banner-user-elem" onClick={() => window.open('https://duo.network', '_blank')}>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${banner2})`
							}}
						/>
					</Element>
					<Element key="ccc" prefixCls="banner-user-elem" onClick={() => window.open('https://duo.network', '_blank')}>
						<BgElement
							key="bg"
							className="bg"
							style={{
								backgroundImage: `url(${banner3})`
							}}
						/>
					</Element>
				</BannerAnim>
			</div>
		);
	}
}
